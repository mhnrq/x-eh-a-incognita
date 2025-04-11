let a = 1, b = 5, c = 7;
let jogadas = 0;
let tempoInicio = 0;
let cronometro;
let equacaoOriginal = { a: 1, b: 5, c: 7 };
let cronometroRodando = false;

let totalEquacoes = localStorage.getItem('totalEquacoes') ? parseInt(localStorage.getItem('totalEquacoes')) : 0;
let tempoTotal = localStorage.getItem('tempoTotal') ? parseInt(localStorage.getItem('tempoTotal')) : 0;
let totalJogadas = localStorage.getItem('totalJogadas') ? parseInt(localStorage.getItem('totalJogadas')) : 0;

function iniciarCronometro() {
  tempoInicio = new Date().getTime();
  clearInterval(cronometro);
  cronometro = setInterval(atualizarTempo, 200);
  cronometroRodando = true;
}

function limparJogadas() {
  a = equacaoOriginal.a;
  b = equacaoOriginal.b;
  c = equacaoOriginal.c;
  jogadas = 0;
  document.getElementById("jogadas").textContent = "0";
  atualizarEquacao();
}

function gerarEquacao() {
  const fatoresInteressantes = [2, 3, 5];
  x = Math.floor(Math.random() * 21) - 10;
  a = fatoresInteressantes[Math.floor(Math.random() * fatoresInteressantes.length)];
  b = Math.floor(Math.random() * 21) - 10;
  c = a * x + b;

  equacaoOriginal = { a, b, c };
}

function proximaEquacao() {
  gerarEquacao();
  jogadas = 0;
  document.getElementById("btn-proxima").style.display = "none";
  document.getElementById("btn-limpar").style.display = "block";
  document.getElementById("btn-reset").style.display = "block";
  document.getElementById("btn-nova-equacao").style.display = "inline-block";
  document.getElementById("tempo").textContent = "0";
  document.getElementById("jogadas").textContent = "0";
  atualizarEquacao();
  setTimeout(iniciarCronometro, 1500);
}

function resetarJogo(confirmar = false) {
  if (confirmar && !confirm("Isso criará uma nova sessão e apagará todos os dados. Continuar?")) return;
  totalEquacoes = 0;
  tempoTotal = 0;
  totalJogadas = 0;

  localStorage.clear();

  jogadas = 0;
  a = 1;
  b = 5;
  c = 7;
  equacaoOriginal = { a, b, c };

  document.getElementById("tempo").textContent = "0";
  document.getElementById("jogadas").textContent = "0";
  document.getElementById("btn-proxima").style.display = "none";
  document.getElementById("btn-limpar").style.display = "block";
  document.getElementById("btn-reset").style.display = "block";

  atualizarRelatorioAcumulado();
  atualizarEquacao();
  setTimeout(iniciarCronometro, 1500);
}

function atualizarEquacao() {
  let ladoEsquerdo = a === 1 ? "x" : `${a}x`;
  if (b > 0) ladoEsquerdo += ` + ${b}`;
  else if (b < 0) ladoEsquerdo += ` - ${Math.abs(b)}`;
  document.getElementById("equacao").textContent = `${ladoEsquerdo} = ${c}`;
  document.getElementById("instrucao").textContent = "Use as cartas para descobrir o valor de X.";
}

function usarCarta(operacao, valor) {
  jogadas++;
  document.getElementById("jogadas").textContent = jogadas;

  switch (operacao) {
    case '+': b += valor; c += valor; break;
    case '-': b -= valor; c -= valor; break;
    case '*': a *= valor; b *= valor; c *= valor; break;
    case '/': a /= valor; b /= valor; c /= valor; break;
  }

  atualizarEquacao();
  verificarVitoria();
}

function verificarVitoria() {
  if (a === 1 && b === 0) {
    const tempoEquacao = Math.floor((new Date().getTime() - tempoInicio) / 1000);
    clearInterval(cronometro);
    cronometroRodando = false;

    totalEquacoes++;
    tempoTotal += tempoEquacao;
    totalJogadas += jogadas;

    localStorage.setItem('totalEquacoes', totalEquacoes);
    localStorage.setItem('tempoTotal', tempoTotal);
    localStorage.setItem('totalJogadas', totalJogadas);

    document.getElementById("tempo").textContent = tempoEquacao;
    document.getElementById("jogadas").textContent = jogadas;
    document.getElementById("btn-limpar").style.display = "none";
    document.getElementById("btn-reset").style.display = "none";
    document.getElementById("btn-nova-equacao").style.display = "none";
    document.getElementById("btn-proxima").style.display = "block";
    document.getElementById("instrucao").textContent = "🎉 Parabéns! Vamos para a próxima?";
    atualizarRelatorioAcumulado();

    const equacaoEl = document.getElementById("equacao");
    equacaoEl.classList.add("resolvido");
    setTimeout(() => equacaoEl.classList.remove("resolvido"), 800);
  }
}

function atualizarTempo() {
  const tempoAtual = Math.floor((new Date().getTime() - tempoInicio) / 1000);
  document.getElementById("tempo").textContent = tempoAtual;
}

function atualizarRelatorioAcumulado() {
  document.getElementById("total-equacoes").textContent = totalEquacoes;
  document.getElementById("tempo-total").textContent = tempoTotal;
  document.getElementById("jogadas-totais").textContent = totalJogadas;
}

function novaEquacao() {
  gerarEquacao();
  jogadas = 0;
  document.getElementById("jogadas").textContent = jogadas;
  atualizarEquacao();
}

window.onload = function() {
  gerarEquacao();
  atualizarEquacao();
  atualizarRelatorioAcumulado();
  setTimeout(iniciarCronometro, 1500);
};
