"""
Módulo para análise estatística de dados numéricos.

Fornece funções para calcular estatísticas básicas como
soma, média, máximo e mínimo de uma lista de números.
"""

from typing import Tuple, List, Union


def calculate_statistics(numbers: List[Union[int, float]]) -> Tuple[Union[int, float], float, Union[int, float], Union[int, float]]:
    """
    Calcula estatísticas básicas de uma lista de números.

    Args:
        numbers: Lista contendo números inteiros ou decimais.

    Returns:
        Tupla contendo (soma, média, máximo, mínimo).

    Raises:
        ValueError: Se a lista estiver vazia.
        TypeError: Se a lista contiver elementos não numéricos.

    Exemplos:
        >>> calculate_statistics([23, 7, 45, 2, 67])
        (144, 28.8, 67, 2)
        >>> calculate_statistics([1.5, 2.5, 3.5])
        (7.5, 2.5, 3.5, 1.5)
    """
    if not numbers:
        raise ValueError("A lista não pode estar vazia")

    if not all(isinstance(num, (int, float)) for num in numbers):
        raise TypeError("Todos os elementos devem ser números")

    total_sum = sum(numbers)
    average = total_sum / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)

    return total_sum, average, maximum, minimum


def display_statistics(numbers: List[Union[int, float]]) -> None:
    """
    Calcula e exibe estatísticas de uma lista de números de forma formatada.

    Args:
        numbers: Lista contendo números inteiros ou decimais.
    """
    try:
        total_sum, average, maximum, minimum = calculate_statistics(numbers)

        print("=" * 40)
        print("ANÁLISE ESTATÍSTICA")
        print("=" * 40)
        print(f"Total:     {total_sum}")
        print(f"Média:     {average:.2f}")
        print(f"Máximo:    {maximum}")
        print(f"Mínimo:    {minimum}")
        print(f"Quantidade: {len(numbers)} números")
        print("=" * 40)

    except ValueError as error:
        print(f"❌ Erro: {error}")
    except TypeError as error:
        print(f"❌ Erro: {error}")


if __name__ == "__main__":
    # Dados de teste
    numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]

    # Opção 1: Obter valores individuais
    total, average, maximum, minimum = calculate_statistics(numbers)
    print("Opção 1 - Valores Individuais:")
    print(f"  Total: {total}")
    print(f"  Média: {average:.2f}")
    print(f"  Maior: {maximum}")
    print(f"  Menor: {minimum}")
    print()

    # Opção 2: Exibição formatada
    print("Opção 2 - Exibição Formatada:")
    display_statistics(numbers)
