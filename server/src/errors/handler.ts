// eu esto fazendo uma forma de pegar os erros chamada de exception handler 
// que é uma forma de conseguir fazer um log dos erros e até capturar esses
// erros e tudo mais mas não exibir para o usuário final esse erro, somente
// o desenvolvedor ter acesso a esse erro

import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup'; // com o ValidationError eu vou 
// conseguir verificar se o error é do tipo de erro de validação

interface ValidationErrors {
  [key: string]: string[],
}

// error => é o erro, request => são todos os dados daminha requisição,
// response => é o que eu quero devolver de resposta e o next não vai ser
// utilizado
const errorHandler: ErrorRequestHandler = (
  error, 
  request, 
  response, 
  next
) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    // error.inner é onde estão os erros e eu estou percorrendo cada um dos
    // erros
    error.inner.forEach(err => {
      // é uma forma de conseguir retornar os erros para o Font-end de uma
      // maneira amigável
      errors[err.path] = err.errors;
    });

    // 400 => erro de requisição mal feita
    return response.status(400).json({ message: 'Validations fails', errors })
  }; // Se o erro for uma instância da classe ValidationError

  console.error(error);

  // 500 => erro interno
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;