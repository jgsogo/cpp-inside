
#include <iostream>
#include <iomanip>
#include <boost/program_options.hpp>
#include "bindings/cpp/crnd_cpp.h"

namespace po = boost::program_options;


void draw_histogram(const std::vector<float>& rolls, const std::string& title) {
    constexpr int nstars = 300;
    constexpr int nclasses = 20;

    int p[nclasses+1]={};
    auto minmax = std::minmax_element(rolls.begin(), rolls.end());
    auto min = *minmax.first;
    auto max = *minmax.second;

    auto step = (max-min)/float(nclasses);

    for (auto& elem: rolls) {
        ++p[int((elem-min)/step)];
    }

    std::cout << title << std::endl;

    for (int i=0; i<nclasses; ++i) {
        std::cout << std::fixed << std::setw( 9 ) << std::setprecision( 6 )
                  << std::setfill( '0' ) << min+i*step+step/2.f << ": ";
        std::cout << std::string(p[i]*nstars/rolls.size(),'*') << std::endl;
    }
}


int main(int argc, char* argv[]) {
    std::string path_to_crnd;
    try
    {
        po::options_description desc("Common options");
        desc.add_options()
            ("crnd", po::value<std::string>(&path_to_crnd)->required(), "Path to crnd library")
            ("help", po::bool_switch(), "Print this help message")
            ;

        po::variables_map vm;
        po::store(po::parse_command_line(argc, argv, desc), vm);
        po::notify(vm);
        if (vm["help"].as<bool>())
        {
            std::cout << "Usage: " << argv[0] << " [options]" << std::endl;
            std::cout << desc << std::endl;
            return 0;
        }
    }
    catch(po::error& e) 
    { 
        std::cerr << "ERROR: " << e.what() << std::endl << std::endl;
        return EXIT_FAILURE;
    }

    std::cout << "CRND CPP" << std::endl;
    std::cout << " - lib: " << path_to_crnd << std::endl;
    try
    {
        float seed = 12345;
        int samples = 100000;
        crnd::cpp::crnd CRND(path_to_crnd);

        //CRND.help(std::cout);

        //std::cout << "BERNOULLI\n";
        //draw_histogram(CRND.bernoulli(seed, samples, 0.5), "bernoulli(0.5)");
        //std::cout << std::endl;

        //std::cout << "UNIFORM\n";
        //draw_histogram(CRND.uniform(seed, samples), "uniform");
        //std::cout << std::endl;

        //std::cout << "NORMAL\n";
        //draw_histogram(CRND.normal(seed, samples, 3, 0.2), "normal(3, 0.2)");
        //std::cout << std::endl;

        std::cout << "LOGNORMAL\n";
        draw_histogram(CRND.lognormal(seed, samples, 3, 0.2), "lognormal(3, 0.2)");
        std::cout << std::endl;

    }
    catch(std::exception &e)
    {
        std::cerr << "Unhandled error: " << e.what();
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}
