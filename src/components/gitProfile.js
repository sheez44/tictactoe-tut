import React, { Component } from 'react';
import styled from 'styled-components';

const ProfileList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 15px;
    grid-column-gap: 15px;

    li {
        border: 1px solid #eee;
        padding: 30px;
        position: relative;
    }

    h3 {
        margin-top: 0;
    }

    .removeItem {
        position: absolute;
        right: 16px;
        top: 16px;
    }
`

class GitProfile extends Component {

    render() {
        return (

            <ProfileList>
                {this.props.brand.length > 0 && this.props.brand.map((data, i) => 
                    <li key={i}>
                        <button className="removeItem" onClick={() => this.props.onClick(data, i)}>X</button>
                        <h3>{data.name ? `${data.name} | ` : data.name} {data.login} </h3>
                        <a href={data.html_url} title={data.html_url}>Go to profile</a>
                    </li>
                )}
            </ProfileList>
        );
    }
}

export default GitProfile;