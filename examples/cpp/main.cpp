
#include <iostream>
#include <boost/program_options.hpp>
#include "bindings/cpp/ctre_cpp.h"

namespace po = boost::program_options;

int main(int argc, char* argv[]) {
    std::string path_to_ctre_wrapper;
    try
    {
        po::options_description desc("Common options");
        desc.add_options()
            ("ctre_wrapper", po::value<std::string>(&path_to_ctre_wrapper)->required(), "Path to ctre_wrapper library")
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

    std::cout << "CTRE CPP" << std::endl;
    std::cout << " - lib: " << path_to_ctre_wrapper << std::endl;
    try
    {
        ctre::cpp::ctre CTRE(path_to_ctre_wrapper);
        for (auto it: {"1", "3", "5", "7", "10"}) {
        //for (auto it: {"2019/02/28", "2019/02/aa", "aaa"}) {
            auto m = CTRE.match(1, it);
            std::cout << it << ": " << m << std::endl;
        }
    }
    catch(std::exception &e)
    {
        std::cerr << "Unhandled error: " << e.what();
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}
