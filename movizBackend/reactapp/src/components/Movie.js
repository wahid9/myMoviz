import React, { useState } from 'react';
import '../App.css';
import {Col, Card, CardImg, CardText, CardBody,
    CardTitle, Badge} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faVideo } from '@fortawesome/free-solid-svg-icons';

function Movie(props) {

    const [watchMovie, setWatchMovie] = useState(false);
    const [countWatchMovie, setCountWatchMovie] = useState(0);
    const [myRatingMovie, setMyRatingMovie] = useState(1)
    const [isRating, setIsRating] = useState(false)

    // var handleClick = () => {
    //     if(!likeMovie){
    //         props.handleAddClickParent(props.movieName, props.movieImg)
    //     } else {
    //         props.handleDeleteClickParent(props.movieName)
    //     }

    // }
    
    var likeClick = () => {
        
        if(props.movieSee == true){
            props.handleDeleteClickParent(props.movieName)
        } else {
            props.handleAddClickParent(props.movieName, props.movieImg)
        }
        // handleClick()
    }

    var heartColor;
    if(props.movieSee == true){
        heartColor = '#e74c3c'
    } 


    var watchClick = () => {
        setWatchMovie(true);
        setCountWatchMovie(countWatchMovie+1)
        console.log(countWatchMovie);
    }

    var tabRating = [];
    for(var i=0;i<10;i++){
        if(i<myRatingMovie){
             var starColor = '#fbc531'
        } else {
            starColor = ''
        }
        let count = i+1
        tabRating.push(<FontAwesomeIcon onClick={()=>{setMyRatingMovie(count); setIsRating(true)}} icon={faStar} color={starColor} />)

    }

    var total = props.globalRating * props.globalCountRating;
    var newTotal = total + myRatingMovie
    var moyenne = Math.round(newTotal/(props.globalCountRating+1))
    // console.log(moyenne);

    var nbVote = props.globalCountRating
    if(isRating){
        nbVote += 1
    }
    
    var stars = [];
    for(var i=0; i<10; i++){
        if(i<Math.round(moyenne)){
            var color = '#fbc531'
        } else {
            color = ''
        }
        stars.push(<FontAwesomeIcon icon={faStar} color= {color}/>)
    }


    return (
        <Col xs={12} lg={6} xl={4} style={{marginBottom: 30}}>
            <Card>
                <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
                <CardBody>
                    <p>Like <FontAwesomeIcon onClick={()=>likeClick()} icon={faHeart} color={heartColor} style={{cursor: 'pointer'}}/></p>
                    <p>Nombre de vues <FontAwesomeIcon onClick={()=>watchClick()} icon={faVideo}/> <Badge color="secondary">{countWatchMovie}</Badge></p>
                    <p>Mon avis {tabRating} <Badge onClick={()=>{if(myRatingMovie >= 1){setMyRatingMovie(myRatingMovie-1)};setIsRating(true)}} color="secondary">-1</Badge><Badge onClick={()=>{if(myRatingMovie<10){setMyRatingMovie(myRatingMovie+1)}; setIsRating(true)}} color="secondary">+1</Badge></p>
                    <p>Moyenne {stars} ({nbVote})</p>
                    <CardTitle>{props.movieName}</CardTitle>
                    <CardText>{props.movieDesc}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}

export default Movie