/**
 * On-page visual editing: the same in-place block editing as the admin editor.
 * Loaded only for signed-in editors (see Base.astro).
 */
import "../plugins/blocks-admin.generated.css";
import "../plugins/blocks-admin.css";
import { installBlockNodeViews } from "../plugins/block-nodeviews.ts";

installBlockNodeViews();
