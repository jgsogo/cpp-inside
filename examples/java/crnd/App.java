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
import java.util.stream.IntStream;
import java.util.stream.Collectors;

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
                    .putParams("mean", 3f)
                    .putParams("stddev", 0.2f)
                    .build())
            .setSeed(12345)
            .setNSamples(100000)
            .build();

        Sample sample = cc.sample(req);

        draw_histogram(sample.getSamplesList(), "lognormal(3, 0.2)");

        System.out.println("-------------------------------------");
        System.out.println("[Java] Bye bye!");
    }


    private static void draw_histogram(List<Float> rolls, String title) {
        int nstars = 300;
        int nclasses = 20;

        int p[] = new int[nclasses+1];

        float min = getMinValue(rolls);
        float max = getMaxValue(rolls);
        float step = (max-min)/(float)nclasses;

        for (int i=0; i<rolls.size(); i++) {
            int idx = (int)((rolls.get(i)-min)/step);
            p[idx] += 1;
        }

        String asterisk = "*";
        System.out.println(title);
        for (int i=0; i<nclasses; ++i) {
            float axis_value = min+i*step+step/2.f;
            int repeat_times = (int) p[i]*nstars/rolls.size();
            String stars = IntStream.range(0, repeat_times).mapToObj(ii -> asterisk).collect(Collectors.joining(""));
            String str = String.format("%2.6f: %s", axis_value, stars);
            System.out.println(str);
        }
    }

    // getting the maximum value
    private static float getMaxValue(List<Float> array) {
        float maxValue = array.get(0);
        for (int i = 1; i < array.size(); i++) {
            if (array.get(i) > maxValue) {
                maxValue = array.get(i);
            }
        }
        return maxValue;
    }

    // getting the miniumum value
    private static float getMinValue(List<Float> array) {
        float minValue = array.get(0);
        for (int i = 1; i < array.size(); i++) {
            if (array.get(i) < minValue) {
                minValue = array.get(i);
            }
        }
        return minValue;
    }
}
