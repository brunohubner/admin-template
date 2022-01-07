import Head from "next/head"
import Layout from "../components/template/Layout"

export default function About() {
    return (
        <>
            <Head>
                <title>Bruno Hubner - Sobre</title>
                <meta name="description" content="Bruno Hubner - Sobre" />
            </Head>
            <div>
                <Layout title="Sobre" subtitle="Informações gerais">
                    <h1>Conteudo da página de perfil de usuário</h1>
                    <p className={`indent-8 mt-4`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iusto facere magnam nobis neque a architecto sapiente,
                        dolorum enim illo. Modi eligendi asperiores laborum
                        sint, totam odit molestias quia accusamus tenetur.Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Iusto
                        facere magnam nobis neque a architecto sapiente, dolorum
                        enim illo. Modi eligendi asperiores laborum sint, totam
                        odit molestias quia accusamus teneturLorem ipsum dolor
                        sit amet consectetur adipisicing elit. Iusto facere
                        magnam nobis neque a architecto sapiente, dolorum enim
                        illo. Modi eligendi asperiores laborum sint, totam odit
                        molestias quia accusamus tenetur.
                    </p>
                </Layout>
            </div>
        </>
    )
}
