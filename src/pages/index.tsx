import Head from "next/head"
import Layout from "../components/template/Layout"

export default function Home() {
    return (
        <>
            <Head>
                <title>Bruno Hubner - Home</title>
                <meta name="description" content="Bruno Hubner - Home" />
            </Head>
            <div>
                <Layout
                    title="Página Inicial"
                    subtitle="Este é um template administrativo"
                >
                    <h1>Seja muito bem-vindo!</h1>
                    <p className={`indent-8 mt-4`}>
                        Esta é um aplicação de modelo para eventuais futuros
                        projetos. Desenvolvida com Next.js, e TailwindCSS com
                        integração ao Firebase. Um template base para futuras
                        aplicaçoes e para fins didáticos.
                    </p>
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
