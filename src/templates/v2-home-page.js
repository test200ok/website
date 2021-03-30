import React from "react"
// import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Header from "../components/v2/Header"
import Footer from "../components/v2/Footer"
import Overlay from "../components/v2/Overlay"
import Ticker from "../components/v2/Ticker"
import Carousel from "../components/v2/Carousel"
import LogoWall from "../components/v2/LogoWall"
import Blog from "../components/v2/Blog"
import Banner from "../components/v2/Banner"
import { Col, Row } from "reactstrap"

// TODO: #339 - will uncomment in next PR
//
// import Carousel from "../components/v2/Carousel"
// import Grid from "../components/v2/Grid"
// import { Col, Row } from "reactstrap"
import { sections } from "../constants"
import { PageSection, ImageLink } from "../components"

/*
export const query = graphql`
  query HomePage($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        hero {
          title
          body
          cta {
            label
            icon {
              image {
                relativePath
              }
              alt
            }
          }
          cta_buttons {
            label
            url
          }
        }
      }
    }
  }
`


/*
function HomePage(props) {
  const { hero } = props

  const cards = [
    {
      icon: "/images/GitHub_Logo.svg",
      description: "How the Kepp Network works",
      label: "ABOUT KEEP",
    },
  ]

  return (
    <div className="main-content">
      <Header />
      <PageSection>
        <Row>
          <Col xs={12}>
            <h1 dangerouslySetInnerHTML={{ __html: hero.title }} />
            <div
              className="body"
              dangerouslySetInnerHTML={{ __html: hero.body }}
            />
          </Col>
        </Row>
      </PageSection>
      <Overlay />
      <Carousel />
      <Grid cards={cards} />
      <Footer />
    </div>
  )
}
*/

const tickerItems = [
  "60.2% APY · KEEP/TBTC POOL",
  "14% APY · KEEP POOL",
  "79.3% APY · TBTC/SADDLE POOL",
  "20.2% APY · KEEP/TBTC POOL",
]

const carousel1 = {
  title: "The Keep solution",
  subtitle: "Privacy-focused infrastructure for the public blockchain.",
  text:
    "The Keep network allows private data to be used on public protocols without sacrificing confidentiality.",
}

const carousel2 = {
  title: "The Keep solution",
  subtitle: "True decentralization.",
  text:
    "Keep is the only protocol that is truly decentralized. “Keeps” are off-chain containers that allow contracts to use private data without exposing the data to the public blockchain.",
}

const carousel3 = {
  title: "The Keep solution",
  subtitle: "Security without compromise.",
  text:
    "The Keep network stores data with the highest level of encryption. Keep and tBTC have been audited by the strongest firms in the ecosystem.",
}

const logoItems = [
  require("../images/v2/logo-1.png"),
  require("../images/v2/logo-2.png"),
  require("../images/v2/logo-3.png"),
  require("../images/v2/logo-3.png"),
  require("../images/v2/logo-5.png"),
]

const blogItems = [
  {
    image: require("../images/v2/grid.png"),
    title: "Headline",
    subtitle: "news outlet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit cursus sed feugiat iaculis dictumst.",
    date: "September, 16 2020",
    label: "READ MORE",
  },
  {
    image: require("../images/v2/grid.png"),
    title: "Headline",
    subtitle: "news outlet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit cursus sed feugiat iaculis dictumst.",
    date: "September, 16 2020",
    label: "READ MORE",
  },
]

const bannerItems = [
  require("../images/v2/logo-6.png"),
  require("../images/v2/logo-7.png"),
  require("../images/v2/logo-8.png"),
  // require("../images/v2/logo-9.png"),
  // require("../images/v2/logo-10.png"),
  // require("../images/v2/logo-11.png"),
]

function HomePage(props) {
  return (
    <>
      <Header />
      <Overlay />
      <Ticker items={tickerItems} />
      <Carousel
        classNames="carousel-bg-2"
        title={carousel2.title}
        subtitle={carousel2.subtitle}
        text={carousel2.text}
      />
      <Carousel
        classNames="carousel-bg-1"
        title={carousel1.title}
        subtitle={carousel1.subtitle}
        text={carousel1.text}
      />
      <Carousel
        classNames="carousel-bg-3"
        title={carousel3.title}
        subtitle={carousel3.subtitle}
        text={carousel3.text}
      />
      <LogoWall items={logoItems} />
      <Blog title="Latest from the Keep Blog" items={blogItems} />
      <Banner
        title="Keep is backed by the strongest VCs in the world."
        images={bannerItems}
      />
      {/* <PageSection id={sections.SUPPORTERS} convex>
        <h2>{supportersSection.title}</h2>
        <Row>
          {supportersSection.supporters.map((supporter, i) => (
            <ImageLink
              key={`supporter-${i}`}
              url={supporter.url}
              label={supporter.name}
              image={supporter.logo}
            />
          ))}
        </Row>
      </PageSection> */}
      <Footer />
    </>
  )
}

HomePage.propTypes = {
  hero: PropTypes.object,
  images: PropTypes.object,
  signupMailingList: PropTypes.func,
  ajaxRequestStates: PropTypes.object,
  supporters_section: PropTypes.object,
  team_section: PropTypes.object,
  advisors_section: PropTypes.object,
}

export default HomePage

export const query = graphql`
  query HomePageV2($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        hero {
          title
          body
          cta {
            label
            icon {
              image {
                relativePath
              }
              alt
            }
          }
          cta_buttons {
            label
            url
          }
        }
        team_section {
          title
          team {
            name
            title
            image {
              childImageSharp {
                fluid(maxWidth: 274, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            social_links {
              url
            }
          }
        }
        advisors_section {
          title
          advisors {
            name
            title
            image {
              childImageSharp {
                fluid(maxWidth: 274, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            social_links {
              url
            }
          }
        }
        supporters_section {
          title
          supporters {
            name
            url
            logo {
              image {
                childImageSharp {
                  fluid(maxWidth: 300, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
          }
        }
      }
    }
    textureCircle2: file(relativePath: { regex: "/texture-circle-2.png/" }) {
      childImageSharp {
        fluid(maxWidth: 604, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
