package crnd;

import java.util.List;
import java.util.ArrayList;
import java.io.File;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import org.apache.commons.io.FileUtils;

import crnd.crnd;
import crnd.messages.HelpProto.Help;
import crnd.messages.ModelProto.Model;
import crnd.messages.SampleProto.Sample;
import crnd.messages.SampleRequestProto.SampleRequest;
import crnd.messages.StatusProto.Status;


public class App
{
    public static void main( String[] args )
    {
        System.out.println("[Java] Hello CRND!");

        System.out.println("-------------------------------------");
        System.out.println("[Java] Call to constructor");
        crnd cc = new crnd();

        System.out.println("-------------------------------------");
        System.out.println("[Java] Call help");
        cc.help();

        System.out.println("-------------------------------------");
        System.out.println("[Java] Call sampling");
        SampleRequest req = SampleRequest.newBuilder()
            .setModel(Model.newBuilder()
                    .setId(Model.Name.LOGNORMAL)
                    .putParams("mean", 0.2f)
                    .putParams("stddev", 3f)
                    .build())
            .setSeed(12345)
            .setNSamples(100000)
            .build();

        Sample sample = cc.sample(req);

        System.out.println("-------------------------------------");
        System.out.println("[Java] Bye bye!");
    }
}
