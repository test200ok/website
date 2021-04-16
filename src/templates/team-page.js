import React from "react"
import { connect } from "react-redux"
import { Col, Row } from "reactstrap"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { App, Icons, Image, PageSection, Profile } from "../components"
import { sections } from "../constants"

export const TeamPageTemplate = ({
  title,
  hero = {},
  images = {},
  team_section: teamSection = {},
  advisors_section: advisorsSection = {},
}) => {
  return (
    <div className="team-content">
      <PageSection id={sections.team.HOME}>
        <Row>
          <Col xs={12}>
            <h1
              className="h1-underline"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Col>
        </Row>
      </PageSection>
      <PageSection id={sections.team.CEO_INFO}>
        <Row>
          <Col xs={12} md={6}>
            <h2
              className="title"
              dangerouslySetInnerHTML={{ __html: hero.name }}
            />
            <h5
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: hero.title }}
            />
            <p className="text">{hero.body}</p>
          </Col>
          <Col xs={12} md={6}>
            <Image imageData={{ image: hero.image, alt: hero.name }} />
          </Col>
        </Row>
      </PageSection>
      <PageSection
        id={sections.team.BANNER}
        additionalClassNames={["blurb", "blurb-desktop"]}
      >
        <div className="blurb-panel">
          <div className="blurb-icon">
            <Icons.CastleGate />
          </div>
          <div className="blurb-text">
            <h5>Behind the Name</h5>
            <p>
              A keep is a fortified tower within a castle. The thick walls of a
              castle’s keep make it an impenetrable stronghold.
            </p>
          </div>
        </div>
      </PageSection>
      <PageSection id={sections.team.TEAM_GALLERY}>
        <h2>{teamSection.title}</h2>
        <Row>
          <Col xs={12} md={6}>
            <Image
              imageData={{
                image: teamSection.hp.image,
                alt: teamSection.hp.name,
              }}
            />
          </Col>
          <Col xs={12} md={6} className="profile-big">
            <h2
              className="team-gallery-title"
              dangerouslySetInnerHTML={{ __html: teamSection.hp.name }}
            />
            <h5
              className="team-gallery-subtitle"
              dangerouslySetInnerHTML={{ __html: teamSection.hp.title }}
            />
            <p className="team-gallery-text">{hero.body}</p>
          </Col>
        </Row>
        <Row className="profiles">
          {teamSection.team.map((member, i) => (
            <Profile
              key={`team-member-${i}`}
              name={member.name}
              title={member.title}
              image={member.image}
              socials={member.social_links}
            />
          ))}
        </Row>
      </PageSection>
      <PageSection id={sections.team.ADVISOR_GALLERY}>
        <h2>{advisorsSection.title}</h2>
        {advisorsSection.advisors.map((advisor, i) => (
          <Profile
            key={`advisor-${i}`}
            name={advisor.name}
            title={advisor.title}
            image={advisor.image}
            socials={advisor.social_links}
          />
        ))}
      </PageSection>
    </div>
  )
}

TeamPageTemplate.propTypes = {
  title: PropTypes.string,
  hero: PropTypes.object,
  images: PropTypes.object,
  team_section: PropTypes.object,
  advisors_section: PropTypes.object,
}

const mapStateToProps = (state) => ({})

export const ConnectedTeamPage = connect(mapStateToProps, {})(TeamPageTemplate)

const TeamPage = ({ data }) => {
  const { markdownRemark: post } = data
  const images = {
    textureCircle2: data.textureCircle2,
  }
  return (
    <App className="app-home">
      <ConnectedTeamPage {...post.frontmatter} images={images} />
    </App>
  )
}

TeamPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    textureCircle1: PropTypes.object,
    textureCircle2: PropTypes.object,
  }),
}

export default TeamPage

export const query = graphql`
  query TeamPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        hero {
          name
          title
          body
          image {
            childImageSharp {
              fluid(maxWidth: 274, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        team_section {
          title
          hp {
            name
            title
            body
            image {
              childImageSharp {
                fluid(maxWidth: 552, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
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
