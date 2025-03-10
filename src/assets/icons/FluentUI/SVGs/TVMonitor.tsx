const TVMonitor = (props: any) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 2048 2048"
      focusable={false}
      {...props}
    >
      <path
        d="M1920 1408h-896v128h256v128H640v-128h256v-128H0V256h1920v1152zM128 384v896h1664V384H128z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  
  export default TVMonitor;