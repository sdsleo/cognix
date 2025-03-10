const Filter = (props: any) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 2048 2048"
      focusable={false}
      {...props}
    >
      <path
        d="M2048 128v219l-768 768v805H768v-805L0 347V128h2048zm-128 128H128v37l768 768v731h256v-731l768-768v-37z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  
  export default Filter;