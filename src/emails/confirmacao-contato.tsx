import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ConfirmacaoContatoProps {
  name: string;
  locale?: string;
}

const i18n: Record<string, {
  preview: string; heading: string; sub: string;
  step1Title: string; step1Desc: string;
  step2Title: string; step2Desc: string; step2Cta: string; step2WaText: string;
  signatureRole: string; footerText: string;
}> = {
  pt: {
    preview: "Recebi sua mensagem. Vamos dar o próximo salto juntos.",
    heading: "Mensagem recebida,",
    sub: "Seu diagnóstico gratuito está na fila de prioridade.",
    step1Title: "Diagnóstico em preparação",
    step1Desc: "Vou estudar o seu perfil e preparar um diagnóstico personalizado antes do nosso primeiro contato.",
    step2Title: "Entro em contato em breve",
    step2Desc: "Prefere não esperar? Me chame agora diretamente no WhatsApp:",
    step2Cta: "Falar no WhatsApp agora →",
    step2WaText: "Olá%20Bruno!%20Acabei%20de%20preencher%20o%20formulário%20no%20site%20da%20Salto.",
    signatureRole: "Fundador · Salto",
    footerText: "Você recebeu este e-mail porque preencheu o formulário em",
  },
  en: {
    preview: "I received your message. Let's take the next leap together.",
    heading: "Message received,",
    sub: "Your free diagnosis is in the priority queue.",
    step1Title: "Diagnosis in preparation",
    step1Desc: "I'll study your profile and prepare a personalised diagnosis before our first contact.",
    step2Title: "I'll reach out soon",
    step2Desc: "Don't want to wait? Message me directly on WhatsApp:",
    step2Cta: "Chat on WhatsApp now →",
    step2WaText: "Hi%20Bruno!%20I%20just%20filled%20out%20the%20form%20on%20the%20Salto%20website.",
    signatureRole: "Founder · Salto",
    footerText: "You received this email because you filled in the form at",
  },
  es: {
    preview: "Recibí tu mensaje. Demos el próximo salto juntos.",
    heading: "Mensaje recibido,",
    sub: "Tu diagnóstico gratuito está en cola prioritaria.",
    step1Title: "Diagnóstico en preparación",
    step1Desc: "Estudiaré tu perfil y prepararé un diagnóstico personalizado antes de nuestro primer contacto.",
    step2Title: "Me pongo en contacto pronto",
    step2Desc: "¿Prefieres no esperar? Escríbeme directamente por WhatsApp:",
    step2Cta: "Hablar por WhatsApp ahora →",
    step2WaText: "Hola%20Bruno!%20Acabo%20de%20rellenar%20el%20formulario%20en%20el%20sitio%20de%20Salto.",
    signatureRole: "Fundador · Salto",
    footerText: "Recibiste este correo porque completaste el formulario en",
  },
  it: {
    preview: "Ho ricevuto il tuo messaggio. Facciamo il prossimo salto insieme.",
    heading: "Messaggio ricevuto,",
    sub: "La tua diagnosi gratuita è in coda prioritaria.",
    step1Title: "Diagnosi in preparazione",
    step1Desc: "Studierò il tuo profilo e preparerò una diagnosi personalizzata prima del nostro primo contatto.",
    step2Title: "Ti contatto presto",
    step2Desc: "Preferisci non aspettare? Scrivimi direttamente su WhatsApp:",
    step2Cta: "Scrivi su WhatsApp ora →",
    step2WaText: "Ciao%20Bruno!%20Ho%20appena%20compilato%20il%20modulo%20sul%20sito%20di%20Salto.",
    signatureRole: "Fondatore · Salto",
    footerText: "Hai ricevuto questa email perché hai compilato il modulo su",
  },
};

export default function ConfirmacaoContato({ name = "João", locale = "pt" }: ConfirmacaoContatoProps) {
  const t = i18n[locale] ?? i18n.pt;
  const waHref = `https://wa.me/5511982864581?text=${t.step2WaText}`;

  return (
    <Html>
      <Head />
      <Preview>{t.preview.replace("{name}", name)}</Preview>
      <Body style={body}>
        <Container style={outer}>
          <Container style={container}>

            {/* Hero header com glow */}
            <Section style={heroSection}>
              <Text style={logoText}>SALTO<span style={logoDot}>·</span></Text>

              <Heading style={heroHeading}>
                {t.heading}<br />{name}. 🚀
              </Heading>

              <Text style={heroSub}>
                {t.sub}
              </Text>
            </Section>

            {/* Body */}
            <Section style={bodySection}>

              <Section style={stepCard}>
                <Text style={stepNumber}>01</Text>
                <Text style={stepTitle}>{t.step1Title}</Text>
                <Text style={stepDesc}>{t.step1Desc}</Text>
              </Section>

              <Section style={stepCard}>
                <Text style={stepNumber}>02</Text>
                <Text style={stepTitle}>{t.step2Title}</Text>
                <Text style={stepDesc}>{t.step2Desc}</Text>
                <Link href={waHref} style={ctaButton}>
                  {t.step2Cta}
                </Link>
              </Section>

            </Section>

            <Hr style={divider} />

            {/* Assinatura */}
            <Section style={signatureSection}>
              <Text style={signatureName}>Bruno Vieira</Text>
              <Text style={signatureRole}>{t.signatureRole}</Text>
              <Link href="https://saltoup.com" style={signatureUrl}>saltoup.com</Link>
            </Section>

            {/* Footer */}
            <Section style={footerSection}>
              <Text style={footerText}>
                {t.footerText}{" "}
                <Link href="https://saltoup.com" style={footerLink}>saltoup.com</Link>.
              </Text>
            </Section>

          </Container>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#080808",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "0",
  padding: "40px 16px",
};

const outer: React.CSSProperties = {
  maxWidth: "580px",
  margin: "0 auto",
};

const container: React.CSSProperties = {
  backgroundColor: "#0e0e0e",
  borderRadius: "16px",
  border: "1px solid #252525",
  overflow: "hidden",
};

const heroSection: React.CSSProperties = {
  background: "linear-gradient(160deg, #1c0800 0%, #120500 40%, #0e0e0e 100%)",
  padding: "40px 36px 36px",
  borderBottom: "1px solid #252525",
};

const logoText: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "900",
  letterSpacing: "2px",
  color: "#888888",
  margin: "0 0 28px",
  textTransform: "uppercase" as const,
};

const logoDot: React.CSSProperties = {
  color: "#FF5C00",
};

const heroHeading: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "900",
  color: "#f5f5f5",
  margin: "0 0 14px",
  letterSpacing: "-1px",
  lineHeight: "1.15",
};

const heroSub: React.CSSProperties = {
  fontSize: "15px",
  color: "#FF5C00",
  fontWeight: "600",
  margin: "0",
};

const bodySection: React.CSSProperties = {
  padding: "28px 36px",
};

const stepCard: React.CSSProperties = {
  backgroundColor: "#141414",
  borderRadius: "12px",
  border: "1px solid #252525",
  padding: "20px 24px",
  marginBottom: "12px",
};

const stepNumber: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "900",
  color: "#FF5C00",
  letterSpacing: "2px",
  margin: "0 0 8px",
};

const stepTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0 0 6px",
};

const stepDesc: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.7",
  color: "#888888",
  margin: "0 0 16px",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(135deg, #FF5C00, #FF3D00)",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "13px",
  padding: "12px 24px",
  borderRadius: "999px",
  textDecoration: "none",
};

const divider: React.CSSProperties = {
  borderColor: "#1e1e1e",
  margin: "0 36px",
};

const signatureSection: React.CSSProperties = {
  padding: "24px 36px",
};

const signatureName: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0",
};

const signatureRole: React.CSSProperties = {
  fontSize: "12px",
  color: "#666666",
  margin: "4px 0 0",
};

const signatureUrl: React.CSSProperties = {
  fontSize: "12px",
  color: "#FF5C00",
  textDecoration: "none",
  display: "block",
  marginTop: "4px",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  borderTop: "1px solid #1e1e1e",
  padding: "16px 36px",
};

const footerText: React.CSSProperties = {
  fontSize: "11px",
  color: "#444444",
  margin: "0",
  textAlign: "center" as const,
};

const footerLink: React.CSSProperties = {
  color: "#666666",
  textDecoration: "none",
};
