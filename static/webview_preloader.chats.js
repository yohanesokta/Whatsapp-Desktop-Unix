window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Nama kontak di daftar chat */
    ._21S-L, ._2aBzC, ._1hI5g {
      filter: blur(5px) !important;
    }

    /* Pesan terakhir di sidebar */
    ._1or4- {
      filter: blur(5px) !important;
    }

    /* Isi percakapan */
    .message-in, .message-out {
      filter: blur(6px) !important;
    }

    /* Info bar (nomor/nama atas) */
    header._3AwwN {
      filter: blur(6px) !important;
    }

    /* Gambar profil */
    ._1WliW img, ._2ZnTl img, ._1lPgH img {
      filter: blur(8px) !important;
    }

    /* Typing / online info */
    ._1BOF7 {
      filter: blur(4px) !important;
    }

    /* Nama grup */
    ._21S-L {
      filter: blur(6px) !important;
    }

    /* Konten media (gambar kiriman) */
    ._1yHR2 img {
      filter: blur(10px) !important;
    }

    ._21S-L, ._2aBzC, ._1hI5g,
    ._1or4-,
    ._1BOF7,
    ._21S-L,
    header._3AwwN,
    ._1WliW img, ._2ZnTl img, ._1lPgH img,
    .message-in, .message-out,
    ._1yHR2 img {
      filter: blur(6px) !important;
      transition: filter 0.2s ease;
    }

    /* Hapus blur saat di-hover */
    ._21S-L:hover, ._2aBzC:hover, ._1hI5g:hover,
    ._1or4-:hover,
    ._1BOF7:hover,
    header._3AwwN:hover,
    ._1WliW img:hover, ._2ZnTl img:hover, ._1lPgH img:hover,
    .message-in:hover, .message-out:hover,
    ._1yHR2 img:hover {
      filter: none !important;
    }


    
  `;
  document.head.appendChild(style);
});
