interface rankSelectorProps {
  updateValue: (value: number) => void,
}



const RankSelector = (props: rankSelectorProps) => {

  const updateValue = props.updateValue;



  return (
    <div className="relative inline-flex">
      <select onChange={(e)=>{
        console.log(e.target.selectedIndex);
      }} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
        <option>Choose a Rank</option>
        <option>Iron 1</option>
        <option>Iron 2</option>
        <option>Iron 3</option>
        <option>Bronze 1</option>
        <option>Bronze 2</option>
        <option>Bronze 3</option>
        <option>Silver 1</option>
        <option>Silver 2</option>
        <option>Silver 3</option>
        <option>Gold 1</option>
        <option>Gold 2</option>
        <option>Gold 3</option>
        <option>Plat 1</option>
        <option>Plat 2</option>
        <option>Plat 3</option>
        <option>Diamond 1</option>
        <option>Diamond 2</option>
        <option>Diamond 3</option>
        <option>Ascendant 1</option>
        <option>Ascendant 2</option>
        <option>Ascendant 3</option>
        <option>Immortal 1</option>
        <option>Immortal 2</option>
        <option>Immortal 3</option>
      </select>
    </div>
  )
}

export default RankSelector;