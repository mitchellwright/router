import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/parts/header";
import { getEndpointById } from "@/lib/data/endpoints";
import SchemaTable from "@/components/groups/endpoints/schema-table";
import * as Craft from "@/components/craft/layout";
import { Separator } from "@/components/ui/separator";
import { Home } from "lucide-react";
import PageWrapper from "@/components/parts/page-wrapper";
import Image from "next/image";
import Icon from "@/public/icon.svg";
import CopyButton from "@/components/parts/copy-button";

import { generateShadcnForm } from "@/lib/utils/generate-form";

const pageData = {
  title: "Endpoint",
  description: "Schema details and posting instructions for your endpoint",
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await useSession();
  if (!session) redirect("/login");

  const endpoint = await getEndpointById(params?.id);
  const schema = endpoint?.schema as GeneralSchema[];

  const url = `https://app.router.so/api/endpoints/${endpoint?.incrementId}`;

  //  ---------- TODO: make this into its own function ----------
  const formattedSchema = new Object() as { [key: string]: ValidationType };
  schema.forEach((field) => {
    formattedSchema[field.key] = field.value;
  });
  const schemaString = JSON.stringify(formattedSchema, null, 2);
  //  ---------------------------------------------------------

  const exampleCurl = `curl -X POST ${url} \\
  --header "Content-Type: application/json" \\
  --header "Authorization: Bearer ${endpoint?.token}" \\
  --data '${schemaString}'`;

  const exampleJs = `fetch("${url}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ${endpoint?.token}"
    },
    body: JSON.stringify(${schemaString})
  })`;

  const exampleForm = `<form action="${url}" method="GET">
    ${schema.map(
      (field) =>
        `<input type="${
          field.value === "boolean"
            ? "checkbox"
            : field.value === "number"
            ? "number"
            : "text"
        }" name="${field.key}" />`
    )}
    <button type="submit" value="Submit" />
  </form>`;

  const shadcnForm = generateShadcnForm(schema, url);

  return (
    <>
      <Breadcrumbs endpoint={endpoint} />
      <PageWrapper>
        <Header
          title={`${pageData?.title}: ${"`"}${endpoint?.name}${"`"}`}
        >{`${pageData?.description}`}</Header>
        <SchemaTable schema={schema} />
        <Separator />
        <Craft.Main>
          <h3>Posting Instructions</h3>
          <p>
            Use the following URL to post to the endpoint for:{" "}
            <span className="text-foreground">{endpoint?.name}</span>
          </p>
          <pre className="relative">
            {url}
            <CopyButton text={url} />
          </pre>

          <h3>Post via API POST Request</h3>
          <p>
            Send a POST request to the provided URL with the following body
            payload structure:
          </p>
          <pre className="relative">
            {schemaString} <CopyButton text={schemaString} />
          </pre>

          <p>Make sure to include the following API key as a header:</p>
          <pre className="relative">
            {endpoint?.token} <CopyButton text={endpoint?.token || ""} />
          </pre>

          <p>A sample CURL request would look like the following:</p>
          <pre className="relative">
            {exampleCurl} <CopyButton text={exampleCurl} />
          </pre>

          <p>
            A sample fetch request in JavaScript would look like the following:
          </p>
          <pre className="relative">
            {exampleJs} <CopyButton text={exampleJs} />
          </pre>

          <h3>Post via Shadcn UI Form</h3>
          <p>Install the Shadcn Form</p>
          <pre className="relative">
            {`npx shadcn-ui@latest add form`}{" "}
            <CopyButton text={`npx shadcn-ui@latest add form`} />
          </pre>
          <p>Your Shadcn UI form should look like this:</p>
          <pre className="relative">
            {shadcnForm} <CopyButton text={shadcnForm} />
          </pre>
          <Separator />
          {endpoint?.formEnabled && (
            <>
              <h3>Post via HTML Form</h3>
              <p>Add the following URL to the form action attribute:</p>
              <pre className="relative">
                {url} <CopyButton text={url} />
              </pre>
              <p>Your HTML form element should look like this:</p>
              <pre className="relative">
                {`<form action="${url}" method="GET">`}{" "}
                <CopyButton text={`<form action="${url}" method="GET">`} />
              </pre>
              <span className="text-sm text-muted-foreground">
                Make sure to use GET as the HTTP method.
              </span>
              <p>
                Add an input element for each of the elements in your schema.
                The name of the field should correspond to the name attribute on
                the HTML input.
              </p>
              <p>Your form should look something like this:</p>
              <pre className="relative">
                {exampleForm} <CopyButton text={exampleForm} />
              </pre>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Ensure that your redirect URLs are set to your desired URLs
                within the endpoint. Upon successful or failed submission, the
                user will be redirected to these URLs. The best experience for
                the user is to provide some sort of client-side validation on
                your inputs so that the user cannot submit the form until all
                inputs are valid. Router.so only does server-side validation.{" "}
                <span className="text-red-500">
                  Please ensure you add validation on the client for the best
                  user experience.
                </span>
              </p>
              <p>Success and fail URLs for this endpoint:</p>
              <pre className="relative">
                {`Success URL: ${endpoint?.successUrl}`}{" "}
                <CopyButton text={`Success URL: ${endpoint?.successUrl}`} />
              </pre>
              <pre className="relative">
                {`Fail URL: ${endpoint?.failUrl}`}{" "}
                <CopyButton text={`Fail URL: ${endpoint?.failUrl}`} />
              </pre>
              <p className="text-red-400 text-xs">
                Currently no authentication is required to post leads from a
                form. However, we will be adding a client-side token that users
                will be required to add to their forms as a hidden input field.
              </p>
            </>
          )}
        </Craft.Main>
      </PageWrapper>
    </>
  );
}

function Breadcrumbs({ endpoint }: { endpoint: any }) {
  return (
    <Breadcrumb className="h-[67.63px] bg-muted/50 rounded-lg border flex items-center justify-between p-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home size={20} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/endpoints">Endpoints</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="px-2 py-1 bg-accent rounded-sm">
            {endpoint?.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
      <Image
        className="hover:animate-spin dark:invert"
        src={Icon}
        width={24}
        height={24}
        alt="Router.so Icon"
      />
    </Breadcrumb>
  );
}
