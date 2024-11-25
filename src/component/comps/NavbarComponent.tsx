import React from "react";
import AbstractComponent from "../AbstractComponent";

export default class NavbarComponent extends AbstractComponent {
  constructor(name?: string, description?: string) {
    super(
      name || "Basic Navbar",
      description || "Navbar with basic styling using tailwindcss",
      "basic-navbar",
    );
    this.setValue("logo_url", "https://flowbite.com/docs/images/logo.svg");
    this.setValue("title", "Konverzka");
  }

  render(
    setSelectedComponent: (component: AbstractComponent) => void,
    selectedComponent?: AbstractComponent,
  ) {
    return (
      <nav
        style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb" }}
      >
        <div
          style={{
            maxWidth: "screen-xl",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1rem",
          }}
        >
          <a
            href="https://flowbite.com/"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <img
              src={
                this.getValue("logo_url") ||
                "https://flowbite.com/docs/images/logo.svg"
              }
              style={{ height: "2rem" }}
              alt={this.getValue("title") || "Logo"}
            />
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                whiteSpace: "nowrap",
                color: "black",
              }}
            >
              {this.getValue("title") || "Title"}
            </span>
          </a>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.5rem",
              width: "2.5rem",
              height: "2.5rem",
              justifyContent: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
              borderRadius: "0.375rem",
              backgroundColor: "transparent",
              border: "none",
            }}
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span style={{ visibility: "hidden" }}>Open main menu</span>
            <svg
              style={{ width: "1.25rem", height: "1.25rem" }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            id="navbar-default"
            style={{
              display: "none",
              width: "100%",
              marginTop: "1rem",
              backgroundColor: "#f9fafb",
            }}
          >
            <ul
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "500",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            >
              <li>
                <a
                  href="#"
                  style={{
                    display: "block",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    color: "white",
                    backgroundColor: "#3b82f6",
                    borderRadius: "0.375rem",
                  }}
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    display: "block",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    color: "#1f2937",
                    borderRadius: "0.375rem",
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    display: "block",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    color: "#1f2937",
                    borderRadius: "0.375rem",
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    display: "block",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    color: "#1f2937",
                    borderRadius: "0.375rem",
                  }}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    display: "block",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    color: "#1f2937",
                    borderRadius: "0.375rem",
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  clone() {
    return new NavbarComponent();
  }
}
