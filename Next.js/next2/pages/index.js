import React from "react";
import Typed from "react-typed";

import BaseLayout from "../components/layouts/BaseLayout";

import { Button, Container, Row, Col } from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.roles = [
      "Developer",
      "Tech Lover",
      "Team Player",
      "Course Creater",
      "React.js"
    ];
  }

  //Roles to be only one element.
  // typed loop to be only one. Backward and Forward.
  // After that, as per the role change, icon to be changed as well.

  componentDidMount() {
    this.onChange();
  }
  onChange = e => {
    if (!!window) {
      let test = document.querySelector(".self-typed span");
      console.log("test el: ", test);
      test.addEventListener("change", e => {
        console.log("this is test :", e);
        // const result = document.querySelector(".result");
        // result.textContent = `You like ${event.target.value}`;
      });
    }
    // console.log("change :", e.target.value);
  };

  render() {
    // this.onChange();
    // this.testfunc();
    return (
      <BaseLayout className="cover">
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni natus exercitationem quis corrupti eos maiores? Totam
                    laboriosam vero veritatis minima nisi rem facere,
                    perferendis velit distinctio magnam nam.
                  </h1>
                </div>
                <div className={"test"}>
                  <Typed
                    onChange={this.onChange}
                    loop
                    typeSpeed={60}
                    backSpeed={60}
                    strings={this.roles}
                    backDelay={1000}
                    loopCount={0}
                    showCursor
                    className="self-typed"
                    cursorChar=" 💻"
                  />
                </div>

                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;
