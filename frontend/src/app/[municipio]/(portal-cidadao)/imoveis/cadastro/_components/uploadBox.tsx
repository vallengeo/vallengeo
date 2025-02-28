/* eslint-disable no-unused-vars */
import { GeoJsonObject } from "geojson";
import React, { useCallback, useState } from "react";
import { FileError, FileWithPath, useDropzone } from "react-dropzone";
import IErrorUpload from "@/interfaces/IErrorUpload";
import { uploadShapeFile } from "@/service/imovelService";
import IIntersectGeo from "@/interfaces/IIntersectGeo";
import { useFormContext } from "react-hook-form";

type IProps = {
  setGeometryUpload?: (value: IIntersectGeo) => void;
  errorUpload?: IErrorUpload;
  setErrorUpload?: (value: IErrorUpload) => void;
  setLoading: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
};

interface FileRejectionWithPatch {
  file: FileWithPath;
  errors: FileError[];
}

const UploadBox: React.FC<IProps> = ({
  setGeometryUpload,
  errorUpload,
  setErrorUpload,
  setLoading,
  setIsDialogOpen,
}) => {
  const form = useFormContext();
  const { setValue } = form;

  const sendFile = (file: File[]) => {
    uploadShapeFile(file)
      .then((response) => {
        if (setGeometryUpload) {
          setGeometryUpload(response.data);
          setValue("georreferenciamento.geoJson.geometry", response.data.geometria);
        }

        if (response.data.informacoesImovel) {
          setIsDialogOpen(true);
        }
      })
      .catch((error) => {
        if (setErrorUpload)
          setErrorUpload({
            error: true,
            message: error.response.data.message,
          });
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/zip": [".zip", ".zip.*"],
      "application/x-zip-compressed": [".zip"],
      "multipart/x-zip": [".zip"],
    },
    onDrop: sendFile,
  });

  return (
    <div className="flex items-center flex-col md:flex-row gap-6 mt-6">
      <div className="flex justify-start gap-4 w-full md:w-fit">
        <div
          {...getRootProps()}
          className="w-full md:w-fit inline-flex items-center justify-center transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-[#DBDBDB] disabled:text-[#BABABA] text-lg bg-transparent text-primary-foreground font-semibold hover:bg-primary-foreground hover:text-white border border-primary-foreground h-10 rounded-3xl px-10 py-2 cursor-pointer"
        >
          <input {...getInputProps()} className="hidden" />
          Upload
        </div>
      </div>

      <div className="ml-4">
        <p>
          <strong>Nenhum upload realizado.</strong> Selecione o shapefile que
          representa a área e faça o upload para cadastrar uma área.
        </p>
      </div>
    </div>
  );
};

export default UploadBox;
