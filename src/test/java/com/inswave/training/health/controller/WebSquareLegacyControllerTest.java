package com.inswave.training.health.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class WebSquareLegacyControllerTest {

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new WebSquareLegacyController()).build();
    }

    // --- /serverTime.wq ---

    @Test
    public void getServerTime_defaultPattern_returns17DigitTimestamp() throws Exception {
        mockMvc.perform(get("/serverTime.wq"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("\\d{17}")));
    }

    @Test
    public void getServerTime_customYearPattern_returns4DigitYear() throws Exception {
        mockMvc.perform(get("/serverTime.wq").param("pattern", "yyyy"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("\\d{4}")));
    }

    @Test
    public void getServerTime_invalidPattern_fallsBackToDefault17DigitTimestamp() throws Exception {
        mockMvc.perform(get("/serverTime.wq").param("pattern", "INVALID!!!"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("\\d{17}")));
    }

    @Test
    public void getServerTime_websquarePath_alsoReturnsTimestamp() throws Exception {
        mockMvc.perform(get("/websquare/serverTime.wq"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("\\d{17}")));
    }

    @Test
    public void getServerTime_responseHasNoCacheHeader() throws Exception {
        mockMvc.perform(get("/serverTime.wq"))
                .andExpect(header().string("Cache-Control", containsString("no-store")));
    }

    // --- /serverTimeZone.wq ---

    @Test
    public void getServerTimeZone_returnsNumericOffsetMinutes() throws Exception {
        mockMvc.perform(get("/serverTimeZone.wq"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("-?\\d+")));
    }

    @Test
    public void getServerTimeZone_websquarePath_alsoWorks() throws Exception {
        mockMvc.perform(get("/websquare/serverTimeZone.wq"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("-?\\d+")));
    }

    // --- /message/getLanguagePack/{lang} ---

    @Test
    public void getLanguagePack_ko_redirectsToKoJs() throws Exception {
        mockMvc.perform(get("/message/getLanguagePack/ko"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/ko.js")));
    }

    @Test
    public void getLanguagePack_en_redirectsToEnJs() throws Exception {
        mockMvc.perform(get("/message/getLanguagePack/en"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/en.js")));
    }

    @Test
    public void getLanguagePack_ch_redirectsToChJs() throws Exception {
        mockMvc.perform(get("/message/getLanguagePack/ch"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/ch.js")));
    }

    @Test
    public void getLanguagePack_unknown_redirectsToKoJsDefault() throws Exception {
        mockMvc.perform(get("/message/getLanguagePack/fr"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/ko.js")));
    }

    @Test
    public void getLanguagePack_EN_caseInsensitive_redirectsToEnJs() throws Exception {
        mockMvc.perform(get("/message/getLanguagePack/EN"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/en.js")));
    }

    // --- /langpack/{lang}.js ---

    @Test
    public void getLangpack_koJs_redirectsToKoJs() throws Exception {
        mockMvc.perform(get("/langpack/ko.js"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/ko.js")));
    }

    @Test
    public void getLangpack_enJs_redirectsToEnJs() throws Exception {
        mockMvc.perform(get("/langpack/en.js"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", containsString("/en.js")));
    }
}
