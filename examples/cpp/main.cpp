
#include <iostream>
#include <boost/program_options.hpp>
#include "bindings/cpp/crnd_cpp.h"

namespace po = boost::program_options;

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
        crnd::cpp::crnd CRND(path_to_crnd);
        /*
        for (auto it: {"1", "3", "5", "7", "10", "12", "17", "58237", "58238"}) {
        //for (auto it: {"2019/02/28", "2019/02/aa", "aaa"}) {
            auto m = CTRE.match(1, it);
            std::cout << it << ": " << m << std::endl;
        }
        */
        auto m = CRND.bernoulli(1234, 10, 0.5);
        std::cout << m.at(0) << std::endl;
    }
    catch(std::exception &e)
    {
        std::cerr << "Unhandled error: " << e.what();
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}
