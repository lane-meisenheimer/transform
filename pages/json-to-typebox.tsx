import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import request from "@utils/request";
import Form, { InputType } from "@components/Form";
import { useSettings } from "@hooks/useSettings";
import { EditorPanelProps } from "@components/EditorPanel";

const formFields = [
  {
    type: InputType.TEXT_INPUT,
    key: "name",
    label: "Type Name"
  }
];
export default function JsonToJsonSchema() {
  const name = "JSON to Typebox";

  const [settings, setSettings] = useSettings(name, {
    name: "Root"
  });

  const transformer = useCallback(
    ({ value }) =>
      request(
        "/api/json-to-typebox",
        { value, rootName: settings.name },
        "application/json"
      ),
    [settings]
  );

  const getSettingsElement = useCallback<EditorPanelProps["settingElement"]>(
    ({ open, toggle }) => {
      return (
        <Form<{ name: string }>
          title={name}
          onSubmit={setSettings}
          open={open}
          toggle={toggle}
          formsFields={formFields}
          initialValues={settings}
        />
      );
    },
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="Typebox"
      resultLanguage={"typescript"}
      editorSettingsElement={getSettingsElement}
      settings={settings}
    />
  );
}
