const FileImage = (props: any) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 2048 2048"
      focusable={false}
      {...props}
    >
      <path
        d="M256 1920h1536v128H128V0h1115l549 549v91h-640V128H256v1792zM1280 512h293l-293-293v293zm768 256v1024H640V768h1408zM768 896v421l320-319 416 416 160-160 256 256V896H768zm987 768h139l-230-230-69 70 160 160zm-987 0h805l-485-486-320 321v165zm960-512q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  
  export default FileImage;