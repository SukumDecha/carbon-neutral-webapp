export const EditProfile = () => {
  return (
    <div className="EditProfileScreen">
      <div className="Profile">
        <div className="ProfilePicture">
          <img src="/Frank.png" alt="" />
        </div>
        <div className="Uname">IWillNotDropTheAlblum</div>
      </div>
      <div className="EditPButton">
        <p>Edit Profile Picture</p>
      </div>
      <div className="Information">
        <div className="SpaceBetween">
          <p>Username</p>
          <p>Frank Ocean</p>
        </div>
        <div className="Line"></div>
        <div className="SpaceBetween">
          <p>Displayname</p>
          <p>IWillNotDropTheAlbum</p>
        </div>
        <div className="Line"></div>
        <div className="SpaceBetween">
          <p>Phone</p>
          <p>+02IVY</p>
        </div>
        <div className="Line"></div>
        <div className="SpaceBetween">
          <p>Email</p>
          <p>Endless@gmail.com</p>
        </div>
        <div className="Line"></div>
        <div className="SpaceBetween">
          <p>Address</p>
          <p>Nostalgia Ultra</p>
        </div>
        <div className="Line"></div>
        <div className="SpaceBetween">
          <p>Date Of Birth</p>
          <p>9/11/2001</p>
        </div>
        <div className="Line"></div>
      </div>
      <button className="Button">Save Changes</button>
    </div>
  );
};
