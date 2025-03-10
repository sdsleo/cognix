import ExcelDocument from "../../../../assets/icons/FluentUI/SVGs/ExcelDocument";
import FileImage from "../../../../assets/icons/FluentUI/SVGs/FileImage";
import KnowledgeArticle from "../../../../assets/icons/FluentUI/SVGs/KnowledgeArticle";
import Media from "../../../../assets/icons/FluentUI/SVGs/Media";
import Page from "../../../../assets/icons/FluentUI/SVGs/Page";
import PDF from "../../../../assets/icons/FluentUI/SVGs/PDF";
import PowerPointDocument from "../../../../assets/icons/FluentUI/SVGs/PowerPointDocument";
import TextDocument from "../../../../assets/icons/FluentUI/SVGs/TextDocument";
import WordDocument from "../../../../assets/icons/FluentUI/SVGs/WordDocument";
import './styles.css';
import { IIconType } from "./types";

function IconType({ type }: IIconType) {
    switch (type) {
        case 'pdf':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <PDF />
            </div>
          );
        case 'docx':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <WordDocument />
            </div>
          );
        case 'csv':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <KnowledgeArticle />
            </div>
          );
        case 'xlsx':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <ExcelDocument />
            </div>
          );
        case 'pptx':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <PowerPointDocument />
            </div>
          );
        case 'txt':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <TextDocument />
            </div>
          );
        case 'png':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <FileImage />
            </div>
          );
        case 'jpg':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <FileImage />
            </div>
          );
        case 'jpeg':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <FileImage />
            </div>
          );
        case 'video':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <Media />
            </div>
          );
        case 'mp4':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <Media />
            </div>
          );
        case 'avi':
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <Media />
            </div>
          );
        default:
          return (
            <div className="cnx-ged-aprroval-icons-cgai">
              <Page />
            </div>
          );
      }
}

export default IconType;
