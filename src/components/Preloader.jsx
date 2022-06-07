const Preloader = () => {
    return (
        <div className="bg-bg_preloader absolute z-50 top-0 left-0 h-screen w-screen flex flex-col justify-center items-center">
            <svg className="" xmlns="http://www.w3.org/2000/svg" height="54.001" viewBox="0 0 250 54.001" width="250"><g fill="#f4f4f4"><path d="m159.443 13.276-.269-.538a1.876 1.876 0 0 0 -.359-.538 26.988 26.988 0 0 0 -45.21.09 1.876 1.876 0 0 1 -.359.538l-.269.538a26.715 26.715 0 0 0 -3.677 13.634 27.365 27.365 0 0 0 2.87 12.11l.269.538.269.538a26.9 26.9 0 0 0 47 0l.269-.538.269-.538a26.2 26.2 0 0 0 2.875-12.11 27.292 27.292 0 0 0 -3.678-13.724zm-32.382 7.624h3.857v4.754c-5.382 0-6.638 0-7.445 2.063h-4.844c.897-4.484 3.857-6.817 8.432-6.817zm10.226-8.611v19.735a6.766 6.766 0 0 1 -4.754 6.907 13.86 13.86 0 0 1 -2.063.538 18.884 18.884 0 0 1 -2.243.179 19.1 19.1 0 0 1 -2.422-.179 7.758 7.758 0 0 1 -2.063-.538c-3.319-1.166-5.2-4.126-5.2-9.688h4.754c-.09 5.382 2.243 6.189 4.934 6.189a4.069 4.069 0 0 0 4.4-4.306v-19.644h4.754c-.097 0-.097.269-.097.807zm11.841 26.731a6.916 6.916 0 0 1 -2.6.449h-.359a17.76 17.76 0 0 1 -2.6 0v-4.485c2.96 0 6.279 0 6.279-4.665s-3.14-4.665-6.279-4.665h-4.754v-4.754h7.714c2.96 0 7.894 1.973 7.894 9.329-.003 5.471-2.694 7.894-5.295 8.791z" transform="translate(-11.256)" /><path d="m97.7 45.287h-97.6v-.987h97.147a1.275 1.275 0 0 1 .179.538 1.961 1.961 0 0 0 .274.449z" transform="translate(-.01 -4.561)" /><path d="m169.9 45.287h97.6v-.987h-97.152a1.275 1.275 0 0 0 -.179.538.82.82 0 0 0 -.269.449z" transform="translate(-17.496 -4.561)" /><path d="m97.6 14.6h-97.6v.987h97.147a1.275 1.275 0 0 0 .179-.538.82.82 0 0 0 .274-.449z" transform="translate(0 -1.503)" /><path d="m169.7 14.6h97.6v.987h-97.152a1.275 1.275 0 0 1 -.179-.538 1.96 1.96 0 0 0 -.269-.449z" transform="translate(-17.475 -1.503)" /><path d="m3.7 31.723h1.615v.628c0 2.512 1.525 3.409 3.05 3.409 1.435 0 2.96-.807 2.96-3.409v-10.316h-4.037v-1.435h5.651v11.841c0 3.588-2.332 4.844-4.575 4.844s-4.574-1.346-4.574-4.844v-.718z" transform="translate(-.381 -2.121)" /><path d="m27.326 31.713h-6.638l-1.884 5.2h-1.704l6.01-16.413h1.7l6.01 16.415h-1.7zm-3.319-9.419s-.359 1.346-.628 2.153l-2.153 5.92h5.651l-2.153-5.92c-.359-.807-.628-2.153-.718-2.153z" transform="translate(-1.761 -2.111)" /><path d="m36 20.6h1.615v7.445h9.508v-7.445h1.615v16.415h-1.615v-7.445h-9.6v7.445h-1.523z" transform="translate(-3.707 -2.121)" /><path d="m55.9 20.6h1.525l8.432 11.751c.538.807 1.346 2.243 1.346 2.243h.09a21.5 21.5 0 0 1 -.179-2.243v-11.751h1.615v16.415h-1.529l-8.34-11.84c-.538-.807-1.346-2.243-1.346-2.243h-.09a21.505 21.505 0 0 1 .179 2.243v11.84h-1.613v-16.415z" transform="translate(-5.756 -2.121)" /><path d="m76 20.6h9.239v1.435h-7.624v6.01h6.185v1.435h-6.185v6.1h8.073v1.435h-9.688z" transform="translate(-7.826 -2.121)" /><path d="m91.3 20.6h1.615v14.98h7.625v1.435h-9.24z" transform="translate(-9.402 -2.121)" /><path d="m185.353 20.5a9.042 9.042 0 0 1 5.831 1.884l-.9 1.256a8.06 8.06 0 0 0 -4.934-1.615 6.578 6.578 0 0 0 -6.638 6.907c0 4.037 2.781 7 6.548 7a6.909 6.909 0 0 0 5.113-2.422v-2.694h-2.773v-1.435h4.3v7.8h-1.435v-1.97a7.322 7.322 0 0 1 -5.382 2.243c-4.485 0-7.983-3.588-7.983-8.522a8.216 8.216 0 0 1 8.253-8.432z" transform="translate(-18.237 -2.111)" /><path d="m200.1 20.9h4.844a7.114 7.114 0 0 1 3.05.449 4.47 4.47 0 0 1 2.512 4.216 4.251 4.251 0 0 1 -3.14 4.4v.09a3.55 3.55 0 0 1 .449.628l3.588 6.638h-1.884l-3.678-6.907h-4.126v6.907h-1.615zm5.562 7.983a3.04 3.04 0 0 0 3.229-3.319 3.043 3.043 0 0 0 -1.525-2.87 4.58 4.58 0 0 0 -2.332-.359h-3.319v6.638h3.947z" transform="translate(-20.606 -2.152)" /><path d="m225.642 20.5a8.27 8.27 0 0 1 8.342 8.342 8.347 8.347 0 1 1 -16.685 0 8.27 8.27 0 0 1 8.343-8.342zm0 15.518a6.789 6.789 0 0 0 6.638-7.086 6.643 6.643 0 1 0 -13.276 0 6.789 6.789 0 0 0 6.638 7.086z" transform="translate(-22.377 -2.111)" /><path d="m241.9 20.9h1.615v10.675c0 2.781 1.794 4.485 4.665 4.485a4.31 4.31 0 0 0 4.665-4.575v-10.585h1.615v10.675c0 3.678-2.512 6.01-6.279 6.01s-6.279-2.332-6.279-6.01z" transform="translate(-24.91 -2.152)" /><path d="m263 20.9h5.651a4.685 4.685 0 0 1 5.023 4.934 4.8 4.8 0 0 1 -5.023 5.023h-4.037v6.459h-1.614zm5.472 8.522a3.344 3.344 0 0 0 3.588-3.588 3.276 3.276 0 0 0 -3.588-3.5h-3.857v7.086z" transform="translate(-27.083 -2.152)" /></g></svg>
            <p className="text-white mt-5">Hang on...</p>
        </div>
    )
}

export default Preloader