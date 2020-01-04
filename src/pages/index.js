import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Mohammad Quanit"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {/* <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" /> */}
        {/* <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1> */}
        <span style={{ width: "20%", float: "left" }}>
          <img
            style={{ width: 130, height: 130, borderRadius: 70 }}
            src="./avatar2.jpg"
            alt="avatar"
          />
        </span>
        <div style={{ width: "80%", float: "right" }}>
          <div style={{paddingBottom: '5px'}}>
            Hi, This is personal Blog of <b>{siteTitle} 👋</b>
            <span role="img" aria-label="wave emoji"></span>
          </div>

          <div style={{paddingBottom: '5px'}}>
            Web
            <span role="img" aria-label="laptop emoji">
              {" "}
              💻{" "}
            </span>{" "}
            & Mobile
            <span role="img" aria-label="mobile emoji">
              📱
            </span>{" "}
            App Developer who loves to write javascript & dart. I Usually do
            coding on Angular, React, Flutter with Node.js
          </div>

          <div style={{paddingBottom: '5px'}}>
            Dedicated site for portfolio.{" "}
            <a href="https://mohammad-quanit.github.io/" target="_blank">
              Do Check it out
            </a>
          </div>
        </div>
        <br /> <br /> <br /> <br /> <br />
        {/* <p>Now go build something great!</p> */}
        <Link to="/blog/">
          <Button marginTop="46px">Go to Blogs</Button>
        </Link>
      </Layout>
    )
  }
}



export default IndexPage
