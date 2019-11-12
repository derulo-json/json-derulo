import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
export const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({mobile}) => (
  <Container text>
    <Header
      as="h1"
      content="JSON Derulo"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0
      }}
    />
    <img
      id="HomePageIMG"
      src="https://theblacksheeponline.com/wp-content/uploads/2016/10/jason-derulo-zoom-f3ecf1b6-aef2-4e91-87ef-1828c48241f2.jpg"
    />
    <Header
      as="h2"
      content="For all your Derulo needs."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Link to="/allproducts">
      <Button primary size="huge">
        Get Shopping
        <Icon name="right arrow" />
      </Button>
    </Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
export class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({fixed: false})
  showFixedMenu = () => this.setState({fixed: true})

  render() {
    const {children} = this.props
    const {fixed} = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        {console.log(this.state)}

        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{minHeight: 700, padding: '1em 0em'}}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a">
                  <button
                    background-color="unset"
                    type="button"
                    className="dropbtn"
                  >
                    <Link to="/home">Home</Link>
                  </button>
                </Menu.Item>
                <Menu.Item as="a">
                  <div className="dropdown">
                    <button
                      background-color="unset"
                      type="button"
                      className="dropbtn"
                    >
                      Shop
                    </button>
                    <div className="dropdown-content">
                      <Link to="/allproducts">All Products</Link>
                      <Link to="/apparel">Apparel </Link>
                      <Link to="/music">Music</Link>
                      <Link to="/treasures">Treasures</Link>
                      <Link to="/cart">Cart</Link>
                    </div>
                  </div>
                </Menu.Item>

                <Menu.Item as="a">
                  <button
                    background-color="unset"
                    type="button"
                    className="dropbtn"
                  >
                    <Link to="/cart">Cart</Link>
                  </button>
                </Menu.Item>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button as="a" inverted={!fixed}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      style={{marginLeft: '0.5em'}}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({sidebarOpened: false})

  handleToggle = () => this.setState({sidebarOpened: true})

  render() {
    const {children} = this.props
    const {sidebarOpened} = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{minHeight: 350, padding: '1em 0em'}}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{marginLeft: '0.5em'}}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({children}) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{padding: '8em 0em'}} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{fontSize: '2em'}}>
              Got An Itch For Derulo Merch?
            </Header>
            <p style={{fontSize: '1.33em'}}>We can scratch it for you!</p>
            <Header as="h3" style={{fontSize: '2em'}}>
              Got A Thirst For Derulo Shirts?
            </Header>
            <p style={{fontSize: '1.33em'}}>We can drown you in tees!</p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src="https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/1200x/9df78eab33525d08d6e5fb8d27136e95/j/d/jd_profilecrewneck_flat_a.jpg"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link to="/allproducts/">
              <Button size="huge">Check Them Out</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{padding: '0em'}} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
            <Header as="h3" style={{fontSize: '2em'}}>
              "What a company!"
            </Header>
            <p style={{fontSize: '1.33em'}}>-Everyone</p>
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
            <Header as="h3" style={{fontSize: '2em'}}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{fontSize: '1.33em'}}>
              <Image
                avatar
                src="https://ca.slack-edge.com/T024FPYBQ-UNB03DR60-8d39434f4b9a-512"
              />
              <b>Colin</b> -Chief Fun Officer at Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{padding: '8em 0em'}} vertical>
      <Container text>
        <Header as="h3" style={{fontSize: '2em'}}>
          You're At A Derulo Concert. And You're Thinking...
        </Header>
        <p style={{fontSize: '1.33em'}}>
          What if I could get my hands on that sweaty towel he just lobbed into
          the wing? What about that water bottle he just crushed? What about the
          unseen treasures lurking in his trailer? Would my life be better?
          Would I be happier? That's why we're here. Explore your fantasies.
          Make them come true...
        </p>
        <Button as="a" size="large">
          Dive In
        </Button>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{margin: '3em 0em', textTransform: 'uppercase'}}
        >
          <a href="#">Case Studies</a>
        </Divider>
        <Header as="h3" style={{fontSize: '2em'}}>
          Why Are You Down Here?
        </Header>
        <p style={{fontSize: '1.33em'}}>
          The goods are up there. You're only here for one thing - and we know
          it. Jason knows it. Don't be afraid. No one's looking at your screen.
          Alt/Cmd-Tab away if you must. But we'll be here waiting.
        </p>
        <Button as="a" size="large">
          No Shame
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{padding: '5em 0em'}}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">MMMMMM</List.Item>
                <List.Item as="a">Whatcha Say?</List.Item>
                <List.Item as="a">That You Only Meant Well?</List.Item>
                <List.Item as="a">Well Of Course You Did</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Wiggle Wiggle</List.Item>
                <List.Item as="a">Wiggle Wiggle</List.Item>
                <List.Item as="a">Wiggle Wiggle</List.Item>
                <List.Item as="a">Patty Cake</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Jason Deruloooooo
              </Header>
              <p>Jason Deruloooooooooooo</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout
