# README - Sistema de Fatura com Imposto e Desconto

## 📚 Explicação do Código

Este documento fornece uma explicação completa do código corrigido para o sistema de cálculo de fatura.

---

## 🎯 Objetivo

O programa calcula o total de uma compra com 3 itens, aplicando:
- ✅ Cálculo de preço unitário × quantidade para cada item
- ✅ Imposto de 10% sobre o subtotal
- ✅ Desconto opcional via cupom (percentual)
- ✅ Formatação profissional do recibo

---

## 📋 Estrutura do Código

```
debug.py
├── Docstring de módulo
├── Imports (typing)
├── get_item_data() - Coleta quantidade e preço
├── calculate_totals() - Calcula todos os totais
├── display_receipt() - Exibe recibo formatado
├── main() - Função principal
└── if __name__ == "__main__": - Ponto de entrada
```

---

## 🔍 Análise de Cada Função

### **1️⃣ Função `get_item_data(item_number: int) -> Tuple[int, float]`**

```python
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
```

**O que faz:**
- Recebe o número do item como parâmetro
- Solicita a quantidade (converte para `int`)
- Solicita o preço (converte para `float`)
- Retorna uma tupla `(quantidade, preço)`

**Type Hints:**
- `item_number: int` → Parâmetro é inteiro
- `-> Tuple[int, float]` → Retorna tupla com int e float

**Exemplo de uso:**
```python
qty1, price1 = get_item_data(1)
# Entrada: 2 e 25.50
# Retorna: (2, 25.50)
```

---

### **2️⃣ Função `calculate_totals(...) -> dict`**

```python
def calculate_totals(
    qty1: int, price1: float,
    qty2: int, price2: float,
    qty3: int, price3: float,
    discount_percent: float = 0
) -> dict:
    """
    Calcula os totais de uma compra com 3 itens.
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
```

**O que faz:**
- Recebe quantidade e preço de 3 itens
- Recebe percentual de desconto (padrão: 0)
- Calcula totais individuais: `quantidade × preço`
- Calcula subtotal: soma dos 3 itens
- Calcula imposto: 10% do subtotal
- Calcula desconto: percentual do subtotal (se > 0)
- Calcula total final: `subtotal + imposto - desconto`
- Retorna dicionário com todos os valores

**Fórmulas Utilizadas:**

| Cálculo | Fórmula |
|---------|---------|
| **Total do Item** | `quantidade × preço` |
| **Subtotal** | `item1 + item2 + item3` |
| **Imposto** | `subtotal × 0.10` |
| **Desconto** | `subtotal × (desconto% / 100)` |
| **Total Final** | `subtotal + imposto - desconto` |

**Exemplo:**
```python
totals = calculate_totals(2, 25.50, 3, 15.00, 1, 50.00, 10)
# Calcula:
# - Item 1: 2 × 25.50 = 51.00
# - Item 2: 3 × 15.00 = 45.00
# - Item 3: 1 × 50.00 = 50.00
# - Subtotal: 51 + 45 + 50 = 146.00
# - Imposto: 146 × 0.10 = 14.60
# - Desconto: 146 × (10 / 100) = 14.60
# - Total: 146 + 14.60 - 14.60 = 146.00
```

---

### **3️⃣ Função `display_receipt(client_name: str, totals: dict) -> None`**

```python
def display_receipt(client_name: str, totals: dict) -> None:
    """
    Exibe o recibo formatado com todos os dados da compra.
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
```

**O que faz:**
- Recebe nome do cliente e dicionário de totais
- Cria linhas decorativas (= e -)
- Exibe recibo formatado com:
  - Nome do cliente
  - Totais de cada item
  - Subtotal
  - Imposto
  - Desconto (apenas se > 0)
  - Total final

**Formatação:**
- `{valor:.2f}` → Exibe com 2 casas decimais
- `{valor:.0f}` → Exibe sem casas decimais (arredonda)
- Alinhamento com espaços

**Exemplo de Output:**
```
===================================
 Cliente: João Silva
===================================
 Item 1:        R$ 51.00
 Item 2:        R$ 45.00
 Item 3:        R$ 50.00
-----------------------------------
 Subtotal:      R$ 146.00
 Imposto (10%): R$ 14.60
 Desconto (10%): -R$ 14.60
===================================
 TOTAL:         R$ 146.00
===================================
```

---

### **4️⃣ Função `main() -> None`**

```python
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
```

**O que faz:**
- Exibe título bem-vindo
- Coleta nome do cliente (com `.strip()` para remover espaços)
- Coleta dados dos 3 itens chamando `get_item_data()`
- Coleta desconto com **validação**:
  - Loop `while True` → Repete até entrada válida
  - `try/except` → Captura erro de conversão
  - Verifica se desconto é negativo
- Calcula totais chamando `calculate_totals()`
- Exibe recibo chamando `display_receipt()`

**Validação de Desconto:**
```python
while True:          # Repete enquanto necessário
    try:
        # Tenta converter entrada
        discount_input = input("...").strip()
        discount_percent = float(discount_input) if discount_input else 0
        
        # Valida se é negativo
        if discount_percent < 0:
            print("❌ Desconto não pode ser negativo.")
            continue  # Volta ao início do loop
        
        break  # Sai do loop se tudo OK
    except ValueError:
        # Captura erros de conversão (não é número)
        print("❌ Valor inválido.")
```

---

## 🔧 Fluxo de Execução

```
1. main() é chamada
   ↓
2. Exibe boas-vindas
   ↓
3. Coleta nome do cliente
   ↓
4. Para cada item (1, 2, 3):
   └─ get_item_data() coleta qty e price
   ↓
5. Coleta desconto (com validação)
   ↓
6. calculate_totals() calcula tudo
   ↓
7. display_receipt() exibe resultado
```

---

## 🐛 Erros do Código Original

| Erro | Linha | Problema | Solução |
|------|-------|----------|---------|
| Falta de aspas | 4 | `input(Preço do item 1? )` | `input("Preço do item 1? ")` |
| F-string sem `f` | 28 | `print(" Item 2: R$ {total_item2:.2f}")` | Adicionar `f` antes |
| Tipo não convertido | 24 | `input()` retorna string | `float(input())` |
| Indentação errada | 32-33 | Bloco `if` sem indentação | Adicionar 4 espaços |

---

## 💡 Conceitos-Chave Explicados

### **Type Hints**
```python
def funcao(param: int) -> str:
    return "resultado"
```
- `param: int` → Parâmetro deve ser inteiro
- `-> str` → Função retorna string
- Melhora segurança e documentação

### **F-strings**
```python
nome = "João"
print(f"Olá, {nome}!")  # Output: Olá, João!

valor = 123.456
print(f"Preço: R$ {valor:.2f}")  # Output: Preço: R$ 123.46
```

### **Tuplas**
```python
tupla = (quantidade, preço)  # Coleção imutável
qty, price = tupla  # Desempacotamento
```

### **Dicionários**
```python
dados = {
    "nome": "João",
    "idade": 30,
    "preço": 123.45
}
print(dados["nome"])  # Output: João
```

### **Validação com Loop**
```python
while True:
    try:
        valor = float(input("Digite um número: "))
        break
    except ValueError:
        print("Erro: digite um número válido")
```

---

## 🚀 Como Usar

### **Executar o programa:**
```bash
python debug.py
```

### **Entrada Exemplo:**
```
Qual é seu nome? Maria Silva
Quantidade do item 1: 2
Preço do item 1? 25.50
Quantidade do item 2: 1
Preço do item 2? 100.00
Quantidade do item 3: 3
Preço do item 3? 10.00
Você tem um cupom de desconto? (Digite o percentual ou 0): 5
```

### **Saída Esperada:**
```
===================================
 BEM-VINDO AO SISTEMA DE FATURA
===================================

===================================
 Cliente: Maria Silva
===================================
 Item 1:        R$ 51.00
 Item 2:        R$ 100.00
 Item 3:        R$ 30.00
-----------------------------------
 Subtotal:      R$ 181.00
 Imposto (10%): R$ 18.10
 Desconto (5%): -R$ 9.05
===================================
 TOTAL:         R$ 190.05
===================================
```

---

## 📊 Exemplo de Cálculo Passo a Passo

**Entrada:**
- Item 1: 2 × R$ 25.50
- Item 2: 1 × R$ 100.00
- Item 3: 3 × R$ 10.00
- Desconto: 5%

**Cálculos:**

| Etapa | Cálculo | Valor |
|-------|---------|--------|
| Item 1 | 2 × 25.50 | R$ 51.00 |
| Item 2 | 1 × 100.00 | R$ 100.00 |
| Item 3 | 3 × 10.00 | R$ 30.00 |
| **Subtotal** | 51 + 100 + 30 | **R$ 181.00** |
| **Imposto 10%** | 181 × 0.10 | **R$ 18.10** |
| **Desconto 5%** | 181 × (5/100) | **R$ 9.05** |
| **TOTAL** | 181 + 18.10 - 9.05 | **R$ 190.05** |

---

## ✨ Melhorias Implementadas

✅ **Funções Separadas** - Cada uma com responsabilidade única  
✅ **Type Hints** - Código seguro e autodocumentado  
✅ **Docstrings** - Explicação clara de cada função  
✅ **Validação** - Entrada do usuário verificada  
✅ **Tratamento de Erros** - Try/except para conversões  
✅ **Formatação** - Output profissional  
✅ **Sem Linhas Genéricas** - Nomes descritivos  
✅ **Reutilizável** - Funções podem ser importadas  

---

## 📚 Recursos Utilizados

- `input()` - Coleta entrada do usuário
- `float()` e `int()` - Conversão de tipos
- `f-strings` - Formatação de strings
- `:.2f` - Formatação com 2 casas decimais
- `Tuple` e `dict` - Estruturas de dados
- `try/except` - Tratamento de exceções
- `while True` - Loop com validação
- `.strip()` - Remove espaços em branco

---

## 🎓 Lições Aprendidas

1. **Sempre converta entrada do usuário** - `input()` retorna sempre string
2. **Use type hints** - Melhoram segurança e clareza
3. **Valide entradas** - Use loops com try/except
4. **Separe responsabilidades** - Uma função = um propósito
5. **Documente tudo** - Docstrings e comentários
6. **Teste casos extremos** - Entrada vazia, negativa, inválida, etc.
7. **Formate output** - Recibos profissionais melhoram UX

---

**Código pronto para produção! 🚀**
