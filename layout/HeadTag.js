import { Fragment } from 'react'
import Head from 'next/head'

const HeadTag = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.name} | Company</title>
        <meta property='og:title' content='My page title' key='title' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' />
      </Head>
    </Fragment>
  )
}

export default HeadTag
