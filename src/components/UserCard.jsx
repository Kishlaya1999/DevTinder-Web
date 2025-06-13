import React from 'react'

const UserCard = ({ user }) => {
  const { firstName, lastName, age, skills, about, photoUrl, gender } = user;

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="user image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{`${age}, ${gender}`}</p>
          <p>{about}</p>
          <p>{skills?.join(", ")}</p>
          <div className="card-actions justify-center my-3">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard