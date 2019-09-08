mkdir build
pushd build
conan install ../../conanfile.py --profile ../profile --build=missing -o csharp=False -o java=False -o objc=False -o php=False -o python=False -o ruby=False -o go=False -o cpp=False
conan source ../../conanfile.py --install-folder=. --source-folder=../../
conan build ../../conanfile.py
conan package ../../conanfile.py --package-folder=../
popd
