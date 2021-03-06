import Head from "next/head"
import Layout from "../components/template/Layout"

export default function Notifications() {
    return (
        <>
            <Head>
                <title>Bruno Hubner - Notificações</title>
                <meta
                    name="description"
                    content="Bruno Hubner - Notificações"
                />
            </Head>
            <div>
                <Layout
                    title="Notificações"
                    subtitle="Área de gerenciamento de notificações"
                >
                    <h1>Conteudo da página de notificações</h1>
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
