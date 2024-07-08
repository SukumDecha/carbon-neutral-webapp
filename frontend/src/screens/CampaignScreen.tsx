import { Trophy } from "lucide-react";
import Button from "../shared/components/Button";

const users = [
  {
    img: "user.png",
    name: "nine",
    tree: 20
  },
  {
    img: "user.png",
    name: "thep",
    tree: 21
  },
  {
    img: "user.png",
    name: "rayong",
    tree: 22
  },
  {
    img: "user.png",
    name: "idk",
    tree: 23
  },
  {
    img: "user.png",
    name: "alice",
    tree: 24
  },
  {
    img: "user.png",
    name: "bob",
    tree: 25
  },
  {
    img: "user.png",
    name: "charlie",
    tree: 26
  },
  {
    img: "user.png",
    name: "david",
    tree: 27
  },
  {
    img: "user.png",
    name: "eve",
    tree: 28
  },
  {
    img: "user.png",
    name: "frank",
    tree: 29
  },
  {
    img: "user.png",
    name: "grace",
    tree: 30
  }
];



function CampaignScreen() {

  const topUser = users.reduce((prev, current) => (prev.tree > current.tree) ? prev : current);
  const otherUsers = users.filter(user => user !== topUser);
  const sortedUsers = [...otherUsers].sort((a, b) => b.tree - a.tree);
  const topTenUsers = sortedUsers.slice(0, 9);


  return (
    <div className="CampaignScreen">
      <div className="-thumbnails">
        <p>100</p>
        <p>Tree Plant</p>
      </div>
      <div className="-contents">
        <p>reduce carbon</p>
        <p>By planting tree</p>
        <p>1$ per tree</p>
        <form action="">
          <input type="number" name="money" id="money"placeholder="Amount"/>
           <Button>Next</Button>
        </form>
        
      </div>
      <div className="-circle"></div>
      <p className="-leaderboard">LeaderBoard</p>
      <div className="-top1">
        <div className="-user-profile">
          <img src={topUser.img} alt="" />
          <p>{topUser.name}</p>
          <div className="-blocktree">
            <Button type="secondary">{topUser.tree}</Button>
          </div>
        </div>
      </div>
      {topTenUsers.map((user,idx)=>(
        <div className="-other" key={idx}>
          <img src={user.img} alt="" />
          <p>{user.name}</p>
          <div className="-blocktree">
            <Button type="secondary">{user.tree}</Button>
          </div>
        </div>
      ))}
      <div className="-other -hidden">
          
          <p>s</p>
          <div className="-blocktree">s</div>
        </div>
      
    </div>
  );
}

export default CampaignScreen;
