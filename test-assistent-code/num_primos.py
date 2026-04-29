"""
Módulo para verificação de números primos.

Este módulo fornece funções otimizadas para verificar se um número é primo,
com suporte a validação e testes.
"""

from typing import List


def is_prime(number: int) -> bool:
    """
    Verifica se um número é primo usando o algoritmo de trial division otimizado.

    Utiliza otimizações matemáticas:
    - Retorna False imediatamente para n ≤ 1
    - Trata 2 e 3 como casos especiais
    - Verifica apenas até √n
    - Usa padrão 6k ± 1 para reduzir iterações

    Args:
        number: Um número inteiro a ser verificado.

    Returns:
        True se o número é primo, False caso contrário.

    Raises:
        TypeError: Se number não for um inteiro.

    Exemplos:
        >>> is_prime(2)
        True
        >>> is_prime(17)
        True
        >>> is_prime(1)
        False
        >>> is_prime(4)
        False
        >>> is_prime(-5)
        False
    """
    if not isinstance(number, int):
        raise TypeError(f"Esperado int, recebido {type(number).__name__}")

    if number <= 1:
        return False

    if number <= 3:
        return True

    if number % 2 == 0 or number % 3 == 0:
        return False

    divisor = 5
    while divisor * divisor <= number:
        if number % divisor == 0 or number % (divisor + 2) == 0:
            return False
        divisor += 6

    return True


def find_primes(start: int, end: int) -> List[int]:
    """
    Encontra todos os números primos em um intervalo.

    Args:
        start: Início do intervalo (inclusivo).
        end: Fim do intervalo (inclusivo).

    Returns:
        Lista com todos os números primos no intervalo.

    Raises:
        ValueError: Se start > end.
    """
    if start > end:
        raise ValueError("start não pode ser maior que end")

    return [num for num in range(start, end + 1) if is_prime(num)]


def count_primes(start: int, end: int) -> int:
    """
    Conta quantos números primos existem em um intervalo.

    Args:
        start: Início do intervalo (inclusivo).
        end: Fim do intervalo (inclusivo).

    Returns:
        Quantidade de números primos no intervalo.
    """
    return len(find_primes(start, end))


def _run_examples() -> None:
    """Executa exemplos de uso das funções."""
    print("=" * 50)
    print("EXEMPLOS DE USO")
    print("=" * 50)

    # Exemplo 1: Verificar se números são primos
    print("\n1️⃣  Verificando se números são primos:")
    numeros_teste = [1, 2, 3, 4, 5, 10, 17, 20, 29, 100]
    for num in numeros_teste:
        resultado = "✓ Primo" if is_prime(num) else "✗ Não primo"
        print(f"   {num:3d} → {resultado}")

    # Exemplo 2: Encontrar primos em um intervalo
    print("\n2️⃣  Números primos entre 1 e 30:")
    primos = find_primes(1, 30)
    print(f"   {primos}")

    # Exemplo 3: Contar primos em um intervalo
    print("\n3️⃣  Quantidade de primos entre 1 e 100:")
    quantidade = count_primes(1, 100)
    print(f"   {quantidade} números primos")

    print("\n" + "=" * 50)


if __name__ == "__main__":
    _run_examples()