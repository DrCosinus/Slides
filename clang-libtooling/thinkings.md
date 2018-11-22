
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