import PageIntro from "../components/layout/PageIntro";

export default function Contact() {
    return (
        <PageIntro
            eyebrow="contato"
            title="Contato em breve."
            description="Esta área vai receber um canal de contato mais completo para iniciar conversas, entender o contexto do projeto e organizar próximos passos. Enquanto isso, a rota já está pronta para evitar páginas inexistentes."
            primaryHref="/"
            primaryLabel="Voltar para a home"
            secondaryHref="/servicos"
            secondaryLabel="Ver serviços"
        />
    );
}
