const GroupedList = (props: any) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 2048 2048"
    focusable={false}
    {...props}
  >
    <path
      d="M640 384V256h384v128H640zm512-128h768v128h-768V256zM0 640V128h512v512H0zm128-384v256h256V256H128zm512 768V896h384v128H640zm512 0V896h768v128h-768zM0 1280V768h512v512H0zm128-384v256h256V896H128zm512 768v-128h384v128H640zm512 0v-128h768v128h-768zM0 1920v-512h512v512H0zm128-384v256h256v-256H128z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default GroupedList;
