import React from 'react';
import './profileInfo.scss';
import ShowMore from 'react-show-more';

const ProfileInfo = ({ person, base_url, biography }) => {
	return (
		<div className='profile-info'>
			<section className='profile-info__person'>
				<div className='profile-info__person__img-box'>
					<img
						className='profile-info__person__img'
						src={
							person.profile_path === null ? (
								'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg'
							) : (
								base_url + person.profile_path
							)
						}
						alt={'person profile'}
					/>
				</div>
				<div className='profile-info__person__profile-box'>
					<p className='profile-info__person__fact'>
						<span>Known For: </span>
						{person.known_for_department}
					</p>
					<p className='profile-info__person__fact'>
						<span>Gender: </span>
						{person.gender === 1 ? 'Female' : 'Male'}
					</p>
					<p className='profile-info__person__fact'>
						<span>Birthday: </span>
						{person.birthday}
					</p>
					<p className='profile-info__person__fact'>
						<span>Place of Birth: </span>
						{person.place_of_birth}
					</p>
					{person.homepage ? (
						<p className='profile-info__person__fact'>
							<span>Official Site: </span>
							<a href={person.homepage} target='_blank'>
								{person.homepage}
							</a>
						</p>
					) : null}
				</div>
			</section>
			<section className='profile-info__biography'>
				<h1 className='profile-info__name'>{person.name}</h1>

				<h2 className='profile-info__biography-title'>Biography</h2>

				<ShowMore lines={12} more='Show more' less='Show less' anchorClass='biography__anchor'>
					<div className='profile-info__biography-content'>
						<p>{biography}</p>
					</div>
				</ShowMore>
			</section>
		</div>
	);
};

export default ProfileInfo;
