import moment from "moment";
import React, {Component} from "react";
import axios from "axios";
import "./Meetups.css";
import FA from 'react-fontawesome';

import InlineBlockList from "meetup-web-components/lib/layout/InlineBlockList";
import AvatarMember from "meetup-web-components/lib/media/AvatarMember";
import Icon from "meetup-web-components/lib/media/Icon";
import Modal from "meetup-web-components/lib/interactive/Modal";
import Section from 'meetup-web-components/lib/layout/Section';
import Button from 'meetup-web-components/lib/forms/Button';
import Stripe from 'meetup-web-components/lib/layout/Stripe';
import Chunk from 'meetup-web-components/lib/layout/Chunk';

const Meetup = props => {
  const date = moment(new Date(props.time)).format("h:mmA, dddd");
  const rsvpers =
    props.rsvpers.length >= 5 ? props.rsvpers.slice(0, 5) : props.rsvpers;

  return (
    <li className="list-item">

      <div className="text--secondary margin--bottom">{date} </div>
      <div className="meetups__name">
        <h3 className="text--bold">
          <a href={props.url} target="_blank">
            {props.name}
          </a>
        </h3>
        {props.searchMode ?
        <FA name="heart" style={{color:'red'}} className="meetups__fav" onClick={() => props.saveFav({...props.meetupData})}/> :
        <FA name="trash" style={{color:'black'}} className="meetups__fav" onClick={() => props.deleteFav({...props.meetupData})}/>
        }
      </div>
      {/* <Icon shape="heart-outline" size="l" color="#F13959"/> */}

      <p className="text--caption margin--bottom">{props.group}</p>
      <div className="margin--bottom">
        <InlineBlockList
          items={rsvpers.map(rsvp => {
            const thumb = rsvp.member_photo
              ? rsvp.member_photo.thumb_link
              : "https://placebear.com/50/50";

            return (
              <AvatarMember
                member={Object.assign(rsvp.member, {
                  photo: Object.assign({}, (rsvp || {}).member_photo, {
                    thumb_link: thumb
                  })
                })}
                alt={rsvp.member.name}
                key={rsvp.member.member_id}
              />
            );
          })}
        />
        <strong>{props.rsvpCount} Going</strong>
      </div>
    </li>
  );
};

class Meetups extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal:false
    }
  }
  onDismiss = () => {
    this.setState({
      showModal:false
    })
  }
  showModal = () => {
    this.setState({
      showModal:true
    })
  }
  renderModal = () => {
    let modal = <Modal
				onDismiss={this.onDismiss}
        closeArea={false}
				fixed
        hideHeroScrim
			>
				<Stripe style={{padding:'50px'}}><Section hasSeparator className="border--none">
					<Chunk className="align--center">
						{this.props.searchMode ? <h2>Event saved as favourite!</h2> : <h2>Event removed from your favorites!</h2>}
						{this.props.searchMode ? <p>Now you can see it in your event wishlist</p> : null}

					</Chunk>
					<div className='row align--center margin--top'>
						<div className='row-item'>
							<Button onClick={this.onDismiss} primary fullWidth>Confirm</Button>
						</div>
					</div>
				</Section></Stripe>
			</Modal>;
    return this.state.showModal ? modal : ""
  }

  saveFav = (data) =>{
		axios.post('/api/favourites', data)
			.then((res) => {
        this.props.fetchFavs().then(() => {
          this.setState({showModal:true})
        })
      })
	}

  deleteFav = (data) =>{
    console.log("delete",data.event_url);
		axios.delete('/api/favourites', {data: {event_url: data.event_url}})
			.then((res) => {
        this.props.fetchFavs().then(() => {
          this.setState({showModal:true})
        })
      })
	}

  render(){
    return (
      <div>
        {this.renderModal()}
        <ul className="list">

          {!this.props.meetups.length && !this.props.error ? (
            <p className="list-item text--error text--bold">
              {this.props.searchMode ?
                <span>We couldn't find anything matching {this.props.query}!</span> :
                <span>You have no favorited events!</span>
              }
            </p>
          ) : (
            ""
          )}
          {this.props.meetups.map(meetup => {
            return (
              <Meetup
                name={meetup.name}
                url={meetup.event_url}
                group={meetup.group.name}
                key={meetup.created}
                time={meetup.time}
                rsvpCount={meetup.yes_rsvp_count}
                rsvpers={meetup.rsvp_sample}
                saveFav={this.saveFav}
                deleteFav={this.deleteFav}
                meetupData={meetup}
                searchMode={this.props.searchMode}
              />
            );
          })}
        </ul>

      </div>
    );

  }
}

export default Meetups;
