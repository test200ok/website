import React from "react"
import { connect } from "react-redux"
import { Col, Row } from "reactstrap"
import PropTypes from "prop-types"
import { graphql, withPrefix } from "gatsby"

import {
  App,
  Image,
  Link,
  PageSection,
  FeatureCard,
  Button,
} from "../components"
import { sections } from "../constants"

export const StakePageTemplate = ({
  hero = {},
  images = {},
  why = {},
  stake_options: StakeOptions = {},
  recommended = {},
  banner = {},
  tech_guide: techGuide = {},
  exchanges = {},
}) => {
  return (
    <div className="stake-content">
      <PageSection
        id={sections.stake.HOME}
        style={{
          backgroundImage: `url(${withPrefix(
            "/images/features/stake-overview.png"
          )})`,
        }}
      >
        <Row>
          <Col xs={12} md={7}>
            <h1
              className="h1-underline"
              dangerouslySetInnerHTML={{ __html: hero.title }}
            />
            <h3
              className="body"
              dangerouslySetInnerHTML={{ __html: hero.body }}
            />
            {hero.cta_buttons.map((btn, i) => (
              <Link
                key={`cta-btn-${i}`}
                url={btn.url}
                className="cta-link btn btn-primary"
              >
                {btn.label}
              </Link>
            ))}
          </Col>
          <Col></Col>
        </Row>
      </PageSection>
      <PageSection id={sections.stake.WHY}>
        <Row>
          <Col xs={12}>
            <h2 dangerouslySetInnerHTML={{ __html: why.title }} />
          </Col>
        </Row>
        <Row className="why-card-section">
          {why.cards.map((card, i) => (
            <Col key={`card-${i}`} xs={12} md={4}>
              <FeatureCard
                icon={`/images/${card.icon.image.relativePath}`}
                title={card.title}
                text={card.body}
              />
            </Col>
          ))}
        </Row>
      </PageSection>
      <PageSection id={sections.stake.STAKE_OPTIONS}>
        <Row>
          <Col xs={12}>
            <h2 dangerouslySetInnerHTML={{ __html: StakeOptions.title }} />
            <h3
              className="body"
              dangerouslySetInnerHTML={{ __html: StakeOptions.body }}
            />
          </Col>
        </Row>
        <div className={"stake-options-section"}>
          {StakeOptions.cards.map((card, i) => (
            <FeatureCard
              icon={`/images/${card.icon.image.relativePath}`}
              title={card.title}
              text={card.body}
              key={`card-${i}`}
              className={"stake-options__card"}
            >
              <div className={"buttons-container"}>
                {card.buttons[0] && (
                  <Button {...card.buttons[0]} className={"btn btn-primary"} />
                )}
                {card.buttons[1] && (
                  <Button {...card.buttons[1]} className={"btn btn-default"} />
                )}
              </div>
            </FeatureCard>
          ))}
        </div>
      </PageSection>
      <PageSection id={sections.stake.RECOMMENDED}>
        <Row>
          <Col xs={12}>
            <h2 dangerouslySetInnerHTML={{ __html: recommended.title }} />
            <h3
              className="body"
              dangerouslySetInnerHTML={{ __html: recommended.body }}
            />
          </Col>
        </Row>
        <Row>
          {recommended.cards.map((card, i) => (
            <Col key={`card-${i}`} xs={12} md={6} lg={4}>
              <FeatureCard
                icon={`/images/${card.icon.image.relativePath}`}
                title={card.title}
                text={card.body}
                button={card.button}
                btnClass="btn-default"
              />
            </Col>
          ))}
        </Row>
      </PageSection>
      <PageSection
        id={sections.stake.BANNER_BUSINESS_TEAM}
        style={{
          backgroundImage: `url(${withPrefix("images/features/rockwall.png")})`,
        }}
      >
        <Row>
          <Col xs={12}>
            <h3 dangerouslySetInnerHTML={{ __html: banner.body }} />
            <div className="contact-section">
              <Link url={banner.button.url} className="btn btn-primary">
                {banner.button.label}
              </Link>
            </div>
          </Col>
        </Row>
      </PageSection>
      <PageSection id={sections.stake.TECH_GUIDE}>
        <Row>
          <Col xs={12} md={5}>
            <Image imageData={images.techUserGuide} />
          </Col>
          <Col md={1}></Col>
          <Col xs={12} md={6}>
            <div className="tech-guide-intro">{techGuide.intro}</div>
            <h3 className="tech-guide-title">{techGuide.title}</h3>
            <h4 className="tech-guide-body">{techGuide.body}</h4>
            <div>
              <Link url={techGuide.button.url} className="btn btn-default">
                {techGuide.button.label}
              </Link>
            </div>
          </Col>
        </Row>
      </PageSection>
      <PageSection
        id={sections.stake.EXCHANGES}
        style={{
          backgroundImage: `url(${withPrefix(
            "/images/features/exchangesbanner.png"
          )})`,
        }}
      >
        <Row>
          <Col xs={12} sm={12}>
            <div className="text-center">
              <h3>{exchanges.title}:</h3>
              <div className="links">
                {exchanges.links.map((item, i) => (
                  <div key={`exchange-${i}`}>
                    <Link url={item.url}>
                      <Image imageData={item.icon} />
                      <span>{item.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </PageSection>
    </div>
  )
}

StakePageTemplate.propTypes = {
  hero: PropTypes.object,
  images: PropTypes.object,
  why: PropTypes.object,
  stake_options: PropTypes.object,
  recommended: PropTypes.object,
  banner: PropTypes.object,
  tech_guide: PropTypes.object,
  exchanges: PropTypes.object,
}

const mapStateToProps = (state) => ({})

export const ConnectedStakePage = connect(
  mapStateToProps,
  {}
)(StakePageTemplate)

const StakePage = ({ data }) => {
  const { markdownRemark: post } = data
  const images = {
    overview: data.textureOverview,
    techUserGuide: data.textureTechUserGuide,
  }
  return (
    <App className="app-home">
      <ConnectedStakePage {...post.frontmatter} images={images} />
    </App>
  )
}

StakePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    textureOverview: PropTypes.object,
    textureTechUserGuide: PropTypes.object,
  }),
}

export default StakePage

export const query = graphql`
  query StakePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        hero {
          title
          body
          cta_buttons {
            label
            url
          }
        }
        why {
          title
          cards {
            title
            body
            icon {
              image {
                relativePath
              }
              alt
            }
          }
        }
        stake_options {
          title
          body
          cards {
            title
            body
            buttons {
              label
              url
            }
            icon {
              image {
                relativePath
              }
              alt
            }
          }
        }
        recommended {
          title
          body
          cards {
            title
            body
            button {
              label
              url
            }
            icon {
              image {
                relativePath
              }
              alt
            }
          }
        }
        banner {
          body
          button {
            label
            url
          }
        }
        tech_guide {
          intro
          title
          body
          button {
            label
            url
          }
        }
        exchanges {
          title
          links {
            name
            icon {
              image {
                relativePath
              }
              alt
            }
            url
          }
        }
      }
    }
    textureOverview: file(
      relativePath: { regex: "/features/stake-overview.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 604, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    textureTechUserGuide: file(
      relativePath: { regex: "/features/tech-user-guide.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 604, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
