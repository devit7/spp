import React from 'react'
import styled from 'styled-components'
import BgImg from "../image/backhero.png"
import { MdKeyboardArrowRight } from 'react-icons/md'

//css
const Section = styled.section`
    background-image: url(${BgImg});
    height: 785px;
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
`
const Content = styled.div`
    width: 100%;
    height: 100px
`

const Left = styled.div`
    padding-left = 220px;
    padding-top = 143px;
`

const Title = styled.p`
    font-size: 55px;
    color: #ffff;
    font-weight: 400;
`
const Desc = styled.p`
  width: 472px;
  font-size: 20px;
  color: #ffff;
  line-height: 30px;
  margin-top: 58px;
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-top: 58px;
  width: 371px;
  height: 71px;
  line-height: 71px;
  font-size: 22px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(90deg, #8E2DE2, #4A00E0);
  text-decoration: none;
  box-shadow: 0 15px 14px rgb(0 42 177 / 12%);
`;

const HeroSection = () => {
    return (
        <div>
            <Section>
                <Content>
                    <Left className="container">
                        <Title>
                            PAYSCHOOL <br/> mempermudah jalanmu!
                        </Title>
                        <Desc>
                            Case studies on the web to solve school payment problems with the NodeJS backend and React frontend
                        </Desc>
                        <Button>
                            <span>Cek Mutasi</span>
                            <MdKeyboardArrowRight />
                        </Button>
                    </Left>
                </Content>
            </Section>
        </div>
    )
}

export default HeroSection
