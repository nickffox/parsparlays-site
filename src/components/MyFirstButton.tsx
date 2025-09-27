


interface MyFirstButtonProps {
  title: string;
  onClick: () => void;
}

function MyFirstButton({ title, onClick }: MyFirstButtonProps) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  )
}

export default MyFirstButton