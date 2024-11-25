import React from "react";
import AbstractComponent from "../AbstractComponent";

export default class Jumbotron extends AbstractComponent {
  constructor(name?: string, description?: string) {
    super(
      name || "Jumbotron",
      description || "Just a simple jumbotron component",
      "basic-jumbotron",
    );
    this.setValue("title", "Title");
    this.setValue("description", "Description");
    this.setValue("get_started", "Start");
    this.setValue("more", "Více");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <section
        style={{ backgroundColor: "white", color: "#1f2937", width: "100%" }}
      >
        <div
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "screen-xl",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              marginBottom: "1rem",
              fontSize: "2.25rem",
              fontWeight: "800",
              lineHeight: "1.25",
              letterSpacing: "-0.02em",
              color: "#111827",
            }}
          >
            {this.getValue("title")}
          </h1>
          <p
            style={{
              marginBottom: "2rem",
              fontSize: "1.125rem",
              fontWeight: "400",
              color: "#6b7280",
              paddingLeft: "4rem",
              paddingRight: "4rem",
            }}
          >
            {this.getValue("description")}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                fontSize: "1rem",
                fontWeight: "500",
                textAlign: "center",
                color: "white",
                borderRadius: "0.5rem",
                backgroundColor: "#3b82f6",
              }}
            >
              {this.getValue("get_started")}
              <svg
                style={{
                  width: "0.875rem",
                  height: "0.875rem",
                  marginLeft: "0.5rem",
                  transform: "rotate(0deg)",
                }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              style={{
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                backgroundColor: "white",
                color: "#1f2937",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
              }}
            >
              {this.getValue("more")}
            </a>
          </div>
        </div>
      </section>
    );
  }

  clone() {
    return new Jumbotron();
  }
}
