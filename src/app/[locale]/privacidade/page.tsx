import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Salto",
  description: "Saiba como a Salto coleta, usa e protege seus dados pessoais.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-32 text-text-primary">
      <h1 className="text-3xl font-black tracking-tight mb-2">Política de Privacidade</h1>
      <p className="text-text-muted text-sm mb-12">Última atualização: abril de 2026</p>

      <div className="flex flex-col gap-10 text-sm leading-relaxed text-text-muted">

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">1. Quem somos</h2>
          <p>A <strong className="text-text-primary">Salto</strong> é uma empresa de assessoria em vendas e estratégia digital, com sede no Brasil. Responsável pelos dados: <strong className="text-text-primary">Bruno Vieira</strong> — <a href="mailto:bruno@saltoup.com" className="text-accent hover:underline">bruno@saltoup.com</a></p>
        </section>

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">2. Dados que coletamos</h2>
          <p>Coletamos apenas os dados que você fornece voluntariamente pelo formulário de contato:</p>
          <ul className="mt-3 flex flex-col gap-1 pl-4 list-disc">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone / WhatsApp</li>
          </ul>
          <p className="mt-3">Também coletamos dados de navegação anonimizados via <strong className="text-text-primary">Vercel Analytics</strong>, sem uso de cookies e sem identificação pessoal.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">3. Como usamos os dados</h2>
          <p>Os dados coletados são usados exclusivamente para:</p>
          <ul className="mt-3 flex flex-col gap-1 pl-4 list-disc">
            <li>Responder ao seu contato e apresentar nossos serviços</li>
            <li>Enviar comunicações relacionadas ao seu pedido</li>
          </ul>
          <p className="mt-3">Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">4. Cookies</h2>
          <p>Utilizamos apenas cookies essenciais para salvar sua preferência de idioma (<code className="bg-surface px-1.5 py-0.5 rounded text-accent text-xs">salto_locale</code>) e consentimento de cookies (<code className="bg-surface px-1.5 py-0.5 rounded text-accent text-xs">salto_cookie_consent</code>). Nenhum cookie de rastreamento ou publicidade é utilizado.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">5. Seus direitos (LGPD)</h2>
          <p>Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
          <ul className="mt-3 flex flex-col gap-1 pl-4 list-disc">
            <li>Confirmar a existência de tratamento dos seus dados</li>
            <li>Acessar, corrigir ou excluir seus dados</li>
            <li>Revogar consentimento a qualquer momento</li>
            <li>Solicitar a portabilidade dos dados</li>
          </ul>
          <p className="mt-3">Para exercer qualquer direito, entre em contato: <a href="mailto:bruno@saltoup.com" className="text-accent hover:underline">bruno@saltoup.com</a></p>
        </section>

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">6. Retenção de dados</h2>
          <p>Os dados do formulário de contato são retidos pelo tempo necessário para atender à sua solicitação e por até 2 anos para fins legais. Você pode solicitar a exclusão a qualquer momento.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">7. Contato</h2>
          <p>Dúvidas sobre esta política: <a href="mailto:bruno@saltoup.com" className="text-accent hover:underline">bruno@saltoup.com</a></p>
        </section>

      </div>
    </main>
  );
}
