import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function Rating(props) {
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating">
      <span>
        {props.value >= 1 
          ? <StarIcon/> 
          : props.value >= 0.5
          ? <StarHalfIcon/>
          : <StarBorderIcon/>
        }
      </span>
      <span>
        {props.value >= 2 
          ? <StarIcon/> 
          : props.value >= 1.5
          ? <StarHalfIcon/>
          : <StarBorderIcon/>
        }
      </span>
      <span>
        {props.value >= 3 
          ? <StarIcon/> 
          : props.value >= 2.5
          ? <StarHalfIcon/>
          : <StarBorderIcon/>
        }
      </span>
      <span>
        {props.value >= 4 
          ? <StarIcon/> 
          : props.value >= 3.5
          ? <StarHalfIcon/>
          : <StarBorderIcon/>
        }
      </span>
      <span>
        {props.value >= 5 
          ? <StarIcon/> 
          : props.value >= 4.5
          ? <StarHalfIcon/>
          : <StarBorderIcon/>
        }
      </span>
      <span>{props.text ? props.text : ''}</span>
    </div>
  );
}
