"""
Sistema de cálculo de fatura com imposto e desconto.

Este programa calcula o total de uma compra com 3 itens,
aplicando imposto de 10% e desconto via cupom (opcional).
"""

from typing import Tuple


def get_item_data(item_number: int) -> Tuple[int, float]:
    """
    Coleta a quantidade e preço de um item.

    Args:
        item_number: Número do item (1, 2 ou 3).

    Returns:
        Tupla contendo (quantidade, preço).
    """
    quantity = int(input(f"Quantidade do item {item_number}: "))
    price = float(input(f"Preço do item {item_number}? "))
    return quantity, price


def calculate_totals(
    qty1: int, price1: float,
    qty2: int, price2: float,
    qty3: int, price3: float,
    discount_percent: float = 0
) -> dict:
    """
    Calcula os totais de uma compra com 3 itens.

    Args:
        qty1, price1: Quantidade e preço do item 1.
        qty2, price2: Quantidade e preço do item 2.
        qty3, price3: Quantidade e preço do item 3.
        discount_percent: Percentual de desconto (padrão: 0).

    Returns:
        Dicionário contendo todos os totais calculados.
    """
    # Calcula totais individuais
    item_total_1 = qty1 * price1
    item_total_2 = qty2 * price2
    item_total_3 = qty3 * price3

    # Calcula subtotal
    subtotal = item_total_1 + item_total_2 + item_total_3

    # Calcula imposto (10%)
    tax = subtotal * 0.10

    # Calcula desconto
    discount = subtotal * (discount_percent / 100) if discount_percent > 0 else 0

    # Calcula total final
    final_total = subtotal + tax - discount

    return {
        "item_total_1": item_total_1,
        "item_total_2": item_total_2,
        "item_total_3": item_total_3,
        "subtotal": subtotal,
        "tax": tax,
        "discount": discount,
        "discount_percent": discount_percent,
        "final_total": final_total,
    }


def display_receipt(client_name: str, totals: dict) -> None:
    """
    Exibe o recibo formatado com todos os dados da compra.

    Args:
        client_name: Nome do cliente.
        totals: Dicionário com os totais calculados.
    """
    linha = "=" * 35
    separador = "-" * 35

    print(linha)
    print(f" Cliente: {client_name}")
    print(linha)
    print(f" Item 1:        R$ {totals['item_total_1']:.2f}")
    print(f" Item 2:        R$ {totals['item_total_2']:.2f}")
    print(f" Item 3:        R$ {totals['item_total_3']:.2f}")
    print(separador)
    print(f" Subtotal:      R$ {totals['subtotal']:.2f}")
    print(f" Imposto (10%): R$ {totals['tax']:.2f}")

    if totals["discount_percent"] > 0:
        print(f" Desconto ({totals['discount_percent']:.0f}%): -R$ {totals['discount']:.2f}")

    print(linha)
    print(f" TOTAL:         R$ {totals['final_total']:.2f}")
    print(linha)


def main() -> None:
    """Função principal que executa o programa."""
    # ENTRADA DE DADOS
    print("\n" + "=" * 35)
    print(" BEM-VINDO AO SISTEMA DE FATURA")
    print("=" * 35 + "\n")

    client_name = input("Qual é seu nome? ").strip()

    # Coleta dados dos 3 itens
    qty1, price1 = get_item_data(1)
    qty2, price2 = get_item_data(2)
    qty3, price3 = get_item_data(3)

    # Coleta desconto (com validação)
    while True:
        try:
            discount_input = input("\nVocê tem um cupom de desconto? (Digite o percentual ou 0): ").strip()
            discount_percent = float(discount_input) if discount_input else 0
            if discount_percent < 0:
                print("❌ Desconto não pode ser negativo. Tente novamente.")
                continue
            break
        except ValueError:
            print("❌ Valor inválido. Digite um número.")

    # CÁLCULOS
    totals = calculate_totals(
        qty1, price1,
        qty2, price2,
        qty3, price3,
        discount_percent
    )

    # EXIBIÇÃO
    print()
    display_receipt(client_name, totals)


if __name__ == "__main__":
    main()
