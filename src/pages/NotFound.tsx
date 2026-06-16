import PageIntro from "../components/layout/PageIntro";

export default function NotFound() {
    return (
        <PageIntro
            eyebrow="404"
            title="Página não encontrada."
            description="O endereço que você tentou acessar não existe ou ainda não foi publicado. Você pode voltar para a home ou seguir para uma das áreas principais da LemonLabs."
            primaryHref="/"
            primaryLabel="Ir para a home"
            secondaryHref="/projetos"
            secondaryLabel="Ver projetos"
        />
    );
}
