package crnd;

import java.util.Arrays;
import java.util.List;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.Parser;
import com.sun.jna.*;
import com.sun.jna.Callback;

import crnd.messages.HelpProto.Help;
import crnd.messages.ModelProto.Model;
import crnd.messages.SampleProto.Sample;
import crnd.messages.SampleRequestProto.SampleRequest;
import crnd.messages.StatusProto.Status;


public class crnd {

    public interface CLibrary extends Library {

        class ProtoSerialized extends Structure {
            public Pointer data;
            public int size;
            protected List<String> getFieldOrder() { return Arrays.asList(new String[]{"data", "size"});}
        }

        interface callback_t extends Callback {
            void invoke(Pointer self, ProtoSerialized data, ProtoSerialized status);
        }

        CLibrary INSTANCE = (CLibrary)Native.loadLibrary("crnd", CLibrary.class);

        void help(Pointer state, callback_t callback);
        void sample(Pointer state, ProtoSerialized sample_request, callback_t callback);
    }

    class CallbackImpl<T extends Message> implements CLibrary.callback_t {
        private Parser<T> _parser;
        private T data;
        private Status status;

        private CallbackImpl(Parser<T> parser)
        {
            _parser = parser;
        }

        @java.lang.Override
        public void invoke(Pointer self, CLibrary.ProtoSerialized data_raw, CLibrary.ProtoSerialized status_raw) {
            System.out.println("[Java] CallbackImpl::invoke");
            try {
                // parse curve_config
                byte[] data_bytes = data_raw.data.getByteArray(0, data_raw.size);
                data = _parser.parseFrom(data_bytes);
                // parse status
                byte[] status_bytes = status_raw.data.getByteArray(0, status_raw.size);
                status = Status.parseFrom(status_bytes);
                if (!status.getOk())
                {
                    System.out.println("[Java] STATUS FAILED: " + status.toString());
                }
            }
            catch (InvalidProtocolBufferException e)
            {
                //! TODO: Deal with the exception
                System.out.println(e);
            }
        }
    }

    public crnd()
    {
    }

    public void help()
    {
        System.out.println("[Java] > help()");
        final CallbackImpl<Help> callbackImpl = new CallbackImpl<>(Help.parser());
        CLibrary.INSTANCE.help(null, callbackImpl);
        System.out.println("[Java] << help");
    }

    public Sample sample(SampleRequest request) //! TODO: What if it fails?
    {
        System.out.println("[Java] > sample()");
        final CallbackImpl<Sample> callbackImpl = new CallbackImpl<>(Sample.parser());
        CLibrary.ProtoSerialized request_serialized = new CLibrary.ProtoSerialized();
        byte[] request_bytes = request.toByteArray();
        request_serialized.data = new Memory(request_bytes.length);
        request_serialized.data.write(0, request_bytes, 0, request_bytes.length);
        request_serialized.size = request_bytes.length;
        CLibrary.INSTANCE.sample(null, request_serialized, callbackImpl);
        System.out.println("[Java] << sample");
        return callbackImpl.data;
    }

}
