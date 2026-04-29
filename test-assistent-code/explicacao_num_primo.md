# Verificação de Números Primos - Clean Code

## 🎯 Visão Geral

Sistema otimizado para verificação de números primos em Python, seguindo princípios de **Clean Code**, com funções bem documentadas, validação de tipos e exemplos claros.

---

## ✨ Melhorias Implementadas

### 1. **Docstring de Módulo**
```python
"""
Módulo para verificação de números primos.

Este módulo fornece funções otimizadas para verificar se um número é primo,
com suporte a validação e testes.
"""
```
- Documenta a propósito do módulo inteiro
- Facilita manutenção e entendimento

### 2. **Type Hints Completos**
```python
from typing import List

def is_prime(number: int) -> bool:
def find_primes(start: int, end: int) -> List[int]:
def count_primes(start: int, end: int) -> int:
```
- Indica claramente quais tipos são esperados
- Facilita debuggin e IDE autocomplete
- Segue PEP 484

### 3. **Validação de Entrada**
```python
if not isinstance(number, int):
    raise TypeError(f"Esperado int, recebido {type(number).__name__}")
```
- Rejeita tipos incorretos
- Mensagem de erro descritiva
- Falha rápido e claramente

### 4. **Nomes Descritivos**
| Antes | Depois | Motivo |
|-------|--------|--------|
| `n` | `number` | Mais claro e autodocumentado |
| `i` | `divisor` | Descreve o papel da variável |
| `if n <= 1:` | `if number <= 1:` | Consistência |

### 5. **Funções Auxiliares**
- `find_primes(start, end)` - Encontra todos os primos em um intervalo
- `count_primes(start, end)` - Conta quantos primos existem
- `_run_examples()` - Executa exemplos (privada, prefixo _)

### 6. **Separação de Concerns**
- Função `is_prime()` → Verifica um único número
- Função `find_primes()` → Trabalha com intervalos
- Função `count_primes()` → Calcula totalizações
- Função `_run_examples()` → Demonstrações

### 7. **Melhor Formatação de Output**
```python
def _run_examples() -> None:
    print("=" * 50)
    print("1️⃣  Verificando se números são primos:")
    resultado = "✓ Primo" if is_prime(num) else "✗ Não primo"
    print(f"   {num:3d} → {resultado}")
```
- Emojis e separadores visuais
- Formatação clara e organizada
- Fácil leitura dos resultados

### 8. **Tratamento de Erros**
```python
def find_primes(start: int, end: int) -> List[int]:
    if start > end:
        raise ValueError("start não pode ser maior que end")
```
- Valida parâmetros
- Erros específicos (ValueError)
- Mensagens claras

---

## 📋 Estrutura do Código

```
num_primos.py
├── Docstring do módulo
├── Imports (typing)
├── is_prime() - Função principal
├── find_primes() - Função auxiliar
├── count_primes() - Função auxiliar
├── _run_examples() - Exemplos (privada)
└── if __name__ == "__main__": - Ponto de entrada
```

---

## 🔍 Análise Detalhada das Funções

### **1. Função `is_prime(number: int) -> bool`**

```python
def is_prime(number: int) -> bool:
    if not isinstance(number, int):
        raise TypeError(...)
    
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
```

| Linha | Explicação |
|-------|-----------|
| `isinstance(number, int)` | Valida o tipo de entrada |
| `number <= 1` | Retorna False (não primos) |
| `number <= 3` | Retorna True (2 e 3 são primos) |
| `number % 2 == 0 or number % 3 == 0` | Elimina pares e múltiplos de 3 |
| `divisor = 5` | Começa verificação em 5 |
| `while divisor * divisor <= number` | Verifica até √number |
| `divisor % number == 0 or number % (divisor + 2) == 0` | Padrão 6k±1 |
| `divisor += 6` | Próximo candidato: i, i+2, i+8 (forma 6k±1) |

**Complexidade**: O(√n)

---

### **2. Função `find_primes(start: int, end: int) -> List[int]`**

```python
def find_primes(start: int, end: int) -> List[int]:
    if start > end:
        raise ValueError("start não pode ser maior que end")
    
    return [num for num in range(start, end + 1) if is_prime(num)]
```

- Utiliza list comprehension (Pythônico)
- Valida parâmetros
- Retorna lista filtrada de primos
- **Exemplo**: `find_primes(1, 10)` → `[2, 3, 5, 7]`

---

### **3. Função `count_primes(start: int, end: int) -> int`**

```python
def count_primes(start: int, end: int) -> int:
    return len(find_primes(start, end))
```

- Reutiliza `find_primes()`
- DRY (Don't Repeat Yourself)
- Simples e eficaz
- **Exemplo**: `count_primes(1, 100)` → `25`

---

### **4. Função `_run_examples() -> None`**

```python
def _run_examples() -> None:
    print("=" * 50)
    print("1️⃣  Verificando se números são primos:")
    # ... exemplos ...
```

- Prefixo `_` indica função privada (interna)
- Retorno `None` (apenas efeitos colaterais)
- Demonstra todos os recursos do módulo
- Organizada em seções numeradas

---

## 🧪 Exemplos de Uso

### **Importar e Usar**
```python
from num_primos import is_prime, find_primes, count_primes

# Verificar um número
print(is_prime(17))  # True

# Encontrar todos os primos
primos = find_primes(1, 50)
print(primos)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

# Contar primos
quantidade = count_primes(1, 1000)
print(quantidade)  # 168
```

### **Executar Exemplos**
```bash
python num_primos.py
```

**Output:**
```
==================================================
EXEMPLOS DE USO
==================================================

1️⃣  Verificando se números são primos:
     1 → ✗ Não primo
     2 → ✓ Primo
     3 → ✓ Primo
    ...
   100 → ✗ Não primo

2️⃣  Números primos entre 1 e 30:
   [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

3️⃣  Quantidade de primos entre 1 e 100:
   25 números primos

==================================================
```

---

## 📊 Comparação: Antes vs Depois

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Funções** | 1 | 4 (reutilizáveis) |
| **Type Hints** | Básicos | Completos (typing) |
| **Validação** | Nenhuma | Com TypeError |
| **Nomes** | Genéricos (n, i) | Descritivos |
| **Documentação** | Docstring | Docstring + Módulo |
| **Exemplos** | Simples | Múltiplos + Formatado |
| **Erros** | Silenciosos | Explícitos e claros |

---

## 🏆 Princípios Clean Code Aplicados

✅ **KISS** - Keep It Simple, Stupid
- Cada função faz uma coisa bem

✅ **DRY** - Don't Repeat Yourself
- Reutilização de `find_primes()` em `count_primes()`

✅ **SOLID - Single Responsibility**
- Cada função tem responsabilidade única

✅ **Nomes Significativos**
- `divisor` em vez de `i`
- `number` em vez de `n`

✅ **Type Hints**
- Código mais seguro e legível

✅ **Tratamento de Erros**
- Falhas explícitas e claras

✅ **Documentação Clara**
- Docstrings descritivas

---

## ⚡ Complexidade

- **`is_prime(n)`**: O(√n) - Verificação básica
- **`find_primes(start, end)`**: O((end-start) × √end) - Para cada número no intervalo
- **`count_primes(start, end)`**: O((end-start) × √end) - Reutiliza find_primes

---

## 🎓 Lições Aprendidas

1. **Nomes claros** facilitam compreensão
2. **Type hints** previnem bugs
3. **Validação** torna código robusto
4. **Separação de concerns** permite reutilização
5. **Documentação completa** economiza tempo de manutenção
