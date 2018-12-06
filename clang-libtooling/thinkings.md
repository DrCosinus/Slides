
https://blogs.msdn.microsoft.com/vcblog/2018/09/18/exploring-clang-tooling-part-0-building-your-code-with-clang/
https://blogs.msdn.microsoft.com/vcblog/2018/10/19/exploring-clang-tooling-part-1-extending-clang-tidy/
https://blogs.msdn.microsoft.com/vcblog/2018/10/23/exploring-clang-tooling-part-2-examining-the-clang-ast-with-clang-query/
https://blogs.msdn.microsoft.com/vcblog/2018/11/06/exploring-clang-tooling-part-3-rewriting-code-with-clang-tidy/

clang-query

## Includes

not needed definition:
- declaration of overriden member function parameter types (parent class has already fo the job)

need uncomplete definition:
- member pointer to type
- member reference to type
- function parameter as pointer to type
- function parameter as reference to type

need complete definition:
- inherit from
- operator dot
- operator arrow


cmake .. -G "Visual Studio 15 2017" -DCMAKE_GENERATOR_PLATFORM=x64 -Thost=x64 -DLLVM_INCLUDE_TESTS=OFF -DLLVM_BUILD_TOOLS=OFF -DLLVM_INCLUDE_UTILS=OFF -DLLVM_TARGETS_TO_BUILD="" -DCLANG_ENABLE_STATIC_ANALYZER=OFF -DCLANG_ENABLE_ARCMT=OFF

cmake --build . --target clang-tidy --config RelWithDebInfo
cmake --build . --target clang-query --config RelWithDebInfo